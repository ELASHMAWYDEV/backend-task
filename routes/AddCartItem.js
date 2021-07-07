const express = require("express");
const router = express.Router();
const storage = require("node-persist");
const { cartItem: validation } = require("../validators");
const { validationResult } = require("express-validator");
const { saveOrder } = require("../services");

const spanInterval = new Map(); //To store all timeout functions
const TIME_SPAN = 10 * 1 * 1000; //ms

router.get("/", validation, async (req, res) => {
  try {
		//Validation
		const result = validationResult(req).formatWith(({ msg, param }) => ({ param, message: msg }));
		if (!result.isEmpty()) return res.status(500).json({ status: false, errors: result.array() });

		const { order_id } = req.query;

		//Check if timeout function already exist for this order_id
		clearTimeout(spanInterval.get(order_id));
		spanInterval.delete(order_id);

		/************************************************/
		//Start the time span
		const timeSpanTimeout = setTimeout(async () => {
			saveOrder(order_id);
			console.log("time finished for order", order_id);
		}, TIME_SPAN);
    /************************************************/
    
		//Get the temp saved items
		const savedItems = (await storage.keys()).includes(order_id) ? await storage.getItem(order_id) : [];

		//Check if the item is duplicated or not
		if (savedItems.filter((item) => req.query.etransaction_id == item.etransaction_id).length != 0)
			return res.json({ status: true, message: "Item is already saved" });

		//Add the item to temp items
		await storage.updateItem(order_id, [...savedItems, req.query]);

		spanInterval.set(order_id, timeSpanTimeout);

		return res.json({ status: true, message: "Item added successfully" });
	} catch (e) {
		console.log(`Error in addCartItem: ${e.message}\n`, e);
	}
});

module.exports = router;
