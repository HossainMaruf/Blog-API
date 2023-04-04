/**
 * import the library
 */
const express = require("express");
const bodyParser = require("body-parser");

/**
 * import the routes file
 */
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const questionRoute = require("./routes/questions");
const examRoute = require("./routes/exam");
const categoryRoute = require("./routes/category");

/**
 * import some essential file
 */
const { DB } = require("./helpers/DB.js");
const { SERVER_PORT } = require("./config.js");
const { skills } = require("./dummy.js"); // for dummy data
const auth = require("./middleware/auth");

// Creating the app
const app = express();
// Creating the database connection
DB.ConnectDB();

/**
 * Setting the middleware
 */
// static folder
app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

/**
 * Setting the routes
 */
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/questions", questionRoute);
app.use("/api/exam", examRoute);
app.use("/api/category", categoryRoute);

app.get("/api/skills", auth, function (req, res) {
  res.send(skills);
});

const PORT = process.env.PORT || SERVER_PORT;
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
