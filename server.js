/**
 * import the library
 */
const express = require('express');
const bodyParser = require('body-parser');

/**
 * import the routes file
 */
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts');

/**
 * import some essential file
 */
const {DB} = require('./helpers/DB.js');
const {SERVER_PORT} = require('./config.js');
const {skills} = require('./dummy.js'); // for dummy data

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
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/**
 * Setting the routes
 */
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);

app.get('/api/skills', function(req, res) {
	res.send(skills);
});

const PORT = 5000;
app.listen(PORT, function() {
	console.log(`Server is running on port ${PORT}`);		
})