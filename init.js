require("dotenv/config");
const mongoose = require("mongoose");
const storage = require("node-persist");
const { DB_URI } = process.env;

try {
	/**************************************************/
	//Connect to mongodb
	mongoose.connect(DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	});

	//Handle connection and database errors
	const db = mongoose.connection;
	db.on("error", (err) => {
		console.log(`MongoDB Error: ${err.message}`);
	});
	db.once("open", () => console.log("connected to DB"));
	db.once("close", () => console.log("Connection to DB closed..."));

	/**************************************************/
	//Initialize node-persist
	(async () => {
		await storage.init({
			dir: "temp/persist/orders",
			stringify: JSON.stringify,
			parse: JSON.parse,
			encoding: "utf8",
			logging: false,
			ttl: 864000 * 1000,
			expiredInterval: 10 * 60 * 1000, //Delete cache every 10 mins
			forgiveParseErrors: false,
		});
	})();
} catch (e) {
	console.log(`Error in init: ${e.message}\n`, e);
}
