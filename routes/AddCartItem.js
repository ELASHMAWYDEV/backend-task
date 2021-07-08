const express = require("express");
const router = express.Router();
const { Mutex } = require("async-mutex");
const { cartItem: validation } = require("../validators");
const { validationResult } = require("express-validator");
const { saveOrder } = require("../services");
const CartItemModel = require("../models/cartItem.model");
const { ordersInterval, TIME_SPAN } = require("../globals");

const MemoryLocks = new Map(); //To prevent race conditions

/*
 * @param MemoryLocks is a map of mutex interfaces to prevent race condition in the route
 */

router.get("/", validation, async (req, res) => {
	const { order_id, product_name, sale_amount, currency, sku_number, quantity, etransaction_id } = req.query || {};

	//Block memory
	if (!MemoryLocks.has(etransaction_id)) MemoryLocks.set(etransaction_id, new Mutex());
	const releaseMemory = await MemoryLocks.get(etransaction_id).acquire();

	try {
		//Validation
		const result = validationResult(req).formatWith(({ msg, param }) => ({ param, message: msg }));
		if (!result.isEmpty()) return res.status(500).json({ status: false, errors: result.array() });

		//Check if timeout function already exist for this order_id
		clearTimeout(ordersInterval.get(order_id));
		ordersInterval.delete(order_id);

		/************************************************/
		//Start the time span
		const timeSpanTimeout = setTimeout(async () => {
			await saveOrder(order_id);
			console.log("time finished for order", order_id);
		}, TIME_SPAN);
		/************************************************/

		//Check if this item already exist
		if (await CartItemModel.findOne({ eTransactionId: etransaction_id }))
			return res.json({ status: false, message: "Item already has been added" });

		//Save the item to DB
		await CartItemModel.create({
			orderId: order_id,
			eTransactionId: etransaction_id,
			name: product_name,
			amount: sale_amount,
			currency: currency,
			payout: sale_amount * 0.05,
			sku: sku_number,
			quantity: quantity,
		});

		ordersInterval.set(order_id, timeSpanTimeout);

		return res.json({ status: true, message: "Item added successfully" });
	} catch (e) {
		console.log(`Error in addCartItem: ${e.message}\n`, e);
	} finally {
		releaseMemory(); //Release memory block
	}
});

module.exports = router;
