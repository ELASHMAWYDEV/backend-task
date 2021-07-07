const { query } = require("express-validator");

module.exports = {
	cartItem: [
		query("order_id").notEmpty().withMessage("order_id is missing"),
		query("sale_amount").notEmpty().toInt().withMessage("sale_amount is missing"),
		query("commissions").notEmpty().withMessage("commissions is missing"),
		query("sid").notEmpty().toInt().withMessage("sid is missing"),
		query("advertiser_id").notEmpty().withMessage("advertiser_id is missing"),
		query("offer_id").notEmpty().toInt().withMessage("offer_id is missing"),
		query("quantity").notEmpty().toInt().withMessage("quantity is missing"),
		query("u1").notEmpty().withMessage("u1 is missing"),
		query("currency")
			.notEmpty()
			.withMessage("currency is missing")
			.isIn(["USD"])
			.withMessage("Currency is not supported"),
		query("is_event").notEmpty().withMessage("is_event is missing"),
		query("product_name").notEmpty().withMessage("product_name is missing"),
		query("transaction_type").notEmpty().withMessage("transaction_type is missing"),
		query("etransaction_id").notEmpty().withMessage("etransaction_id is missing"),
		query("sku_number").notEmpty().withMessage("sku_number is missing"),
		query("process_date")
			.notEmpty()
			.withMessage("process_date is missing")
			.toDate()
			.withMessage("process_date must be a valid date object"),
		query("transaction_date")
			.notEmpty()
			.withMessage("transaction_date is missing")
			.toDate()
			.withMessage("transaction_date must be a valid date object"),
	],
};
