require("dotenv/config");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5555;

try {
	//Middlewares
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	//Initialization
	require("./init");



	//Routes
	app.use("/", require("./routes/index"));

	app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
} catch (e) {
	console.log(`Error in index file: ${e.message}\n`, e);
}
