const mongoose = require("mongoose");

const payoutSchema = new mongoose.Schema({
	currency: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
});
const cartItemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	currency: {
		type: String,
		required: true,
	},
	payout: {
		type: Number,
		required: true,
	},
	sku: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
});

const OrderSchema = new mongoose.Schema({
	orderId: {
		type: String,
		required: true,
	},
	currency: {
		type: String,
		required: true,
	},
	payout: {
		type: payoutSchema,
		required: true,
	},
	cartItems: {
		type: [cartItemSchema],
	},
});

const OrderModel = mongoose.model("Order", OrderSchema, "orders");
module.exports = OrderModel;
