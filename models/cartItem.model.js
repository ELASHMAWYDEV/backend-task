const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
	orderId: {
		type: String,
	},
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
	eTransactionId: {
		type: String,
		unique: true,
	},
	createTime: {
		type: Date,
		defualt: Date.now(),
	},
});

const CartItemModel = mongoose.model("CartItem", cartItemSchema, "cartItems");

module.exports = CartItemModel;
