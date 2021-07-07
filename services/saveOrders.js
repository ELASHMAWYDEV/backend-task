const storage = require("node-persist");
const OrderModel = require("../models/order.model");

module.exports = async (orderId) => {
	try {
		//Get all saved items
		const savedItems = (await storage.keys()).includes(orderId) ? await storage.getItem(orderId) : [];

		//Calculate total amount
		let amount = 0;
		for (let item of savedItems) {
			amount += +item.sale_amount;
		}

		//Get the currency of the order
		let currency = savedItems[0].currency.toLowerCase();

		//Get the payout of each order --> according to data of the offer (assume percantage = 5%)
		const cartItems = savedItems.map((item) => ({
			name: item.product_name,
			amount: item.sale_amount,
			currency: item.currency,
			payout: item.sale_amount * 0.05,
			sku: item.sku_number,
			quantity: item.quantity,
		}));

		//Manipulate the order object
		let order = {
			orderId: savedItems[0].order_id,
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
	} catch (e) {
		console.log(`Error in saveOrder: ${e.message}\n`, e);
	}
};
