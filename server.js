const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('./db/db');

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));

const photosController = require('./controllers/photos.js');
app.use('/photos', photosController);

const usersController = require('./controllers/users.js');
app.use('/users', usersController);




app.get('/', (req, res) => {
	res.render('index.ejs');
});


app.listen(3000, () => {
	console.log('Snap! Listening on port 3000');
});