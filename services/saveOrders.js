const OrderModel = require("../models/order.model");
const CartItemModel = require("../models/cartItem.model");

module.exports = async (orderId) => {
	try {
		//Get all saved items
		const cartItems = await CartItemModel.aggregate([
			{ $match: { orderId } },
			{
				$project: {
					_id: 0,
					name: 1,
					amount: 1,
					currency: 1,
					payout: 1,
					sku: 1,
					quantity: 1,
				},
			},
		]);

		//Calculate total amount
		let amount = 0;
		for (let item of cartItems) {
			amount += +item.amount;
		}

		//Get the currency of the order
		let currency = cartItems[0].currency.toLowerCase();

		//Manipulate the order object
		let order = {
			orderId: orderId,
			currency,
			amount,
			payout: {
				amount: amount * 0.05,
				currency,
			},
			cartItems,
		};

		console.log(order);

		const savedOrder = await OrderModel.create(order);
		console.log("Order saved successfully", savedOrder);

		//Delete all cartItems with this orderId
		await CartItemModel.deleteMany({ orderId });
		console.log("Temporary cart items deleted from DB");
	} catch (e) {
		console.log(`Error in saveOrder: ${e.message}\n`, e);
	}
};
