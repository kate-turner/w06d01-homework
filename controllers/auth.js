const express = require('express');
const router = express.Router();
const Auth = require('../models/login');

router.get('/', (req, res) => {
	res.render('auth/login.ejs', {
		message: req.session.message
	});
})

router.post('/login', (req, res) => {
	console.log(req.session);
	req.session.loggedIn = true;
	req.session.userName = req.body.username;

	res.redirect('/photos');
})

module.exports = router;