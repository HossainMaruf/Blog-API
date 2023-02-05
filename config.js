require('dotenv').config();

module.exports = {
	SERVER_PORT: process.env.SERVER_PORT,
	MONGO_URL: process.env.MONGO_URL,
	LOCAL_MONGO_URL: process.env.LOCAL_MONGO_URL
}