const express = require('express');
const mongoose = require('mongoose');
const app = express();
const {SERVER_PORT, MONGO_URL} = require('./config.js');

// export the dummy data
const {skills} = require('./dummy.js');

// Creating the database connection
mongoose.connect(
  MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DB Connected");
  }
);


app.get('/api/skills', function(req, res) {
	res.send(skills);
});

app.listen(SERVER_PORT, function() {
	console.log(`Server is running on port ${SERVER_PORT}`);		
})