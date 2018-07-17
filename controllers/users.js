const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/', (req,res) => {
	User.find({}, (err, foundUsers) => {
		if(err){
			console.log(err);
		} res.render('users/index.ejs', {
			users: foundUsers
		});
	});
});



router.get('/new', (req, res) => {
	res.render('users/new.ejs');
});

router.post('/', (req, res) => {
	User.create(req.body, (err, createdUser) => {
		console.log(createdUser, 'this is the createdUser');
		res.redirect('/users');
	});
});

router.put('/:id', (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
		console.log(updatedUser);
		res.redirect('/users');
	});
});

router.get('/:id/edit', (req, res) => {
	User.findById(req.params.id, (err, editUser) => {
		res.render("users/edit.ejs", {
			user: editUser
		});
	});
});

router.get('/:id', (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
	res.render("users/show.ejs", {
		user: foundUser
		});
	});
});

router.delete('/:id', (req, res) => {
	User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
		console.log(deletedUser, 'this is the deletedUser');
		res.redirect('/users')
	})
});

module.exports = router;