const mongoose = require("mongoose");
const { NODE_ENV, MONGO_URL, LOCAL_MONGO_URL } = require("../config.js");

const db_url = NODE_ENV === "development" ? LOCAL_MONGO_URL : MONGO_URL;

class DB {
  static ConnectDB() {
    mongoose.connect(
      db_url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        console.log("DB Connected");
      }
    );
  }
}

module.exports = { DB };
