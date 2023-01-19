const mongoose = require('mongoose')
const {MONGO_URL} = require('../config.js');

class DB {
	static ConnectDB() {
		mongoose.connect(
		  MONGO_URL,
		  { useNewUrlParser: true, useUnifiedTopology: true },
		  () => {
		    console.log("DB Connected");
		  }
		);
	}
}


module.exports = {DB}