const mongoose = require('mongoose')
const {MONGO_URL, LOCAL_MONGO_URL} = require('../config.js');

class DB {
	static ConnectDB() {
		mongoose.connect(
		  mongodb+srv://MarufHossain:maruf170626@portfolio-blog.hwgz8yk.mongodb.net/blog?retryWrites=true&w=majority,
		  { useNewUrlParser: true, useUnifiedTopology: true},
		  () => {
		    console.log("DB Connected");
		  }
		);
	}
}


module.exports = {DB}