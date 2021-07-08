const CartItemModel = require("../models/cartItem.model");
const { saveOrder } = require("../services");
const { ordersInterval, TIME_SPAN } = require("../globals");

(async () => {
	try {
		//Get all orders ids
		const ordersIds = await CartItemModel.distinct("orderId");

		/************************************************/

		for (let orderId of ordersIds) {
			//Start the time span
      const timeSpanTimeout = setTimeout(async () => {
				await saveOrder(orderId);
				console.log("time finished for order", orderId);
			}, TIME_SPAN);

			//Save the timeout function
			ordersInterval.set(orderId, timeSpanTimeout);
		}
		/************************************************/
	} catch (e) {
		console.log(`Error in ordersTimeout: ${e.message}\n`, e);
	}
})();
