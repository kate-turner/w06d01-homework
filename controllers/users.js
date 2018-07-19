const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Photo = require('../models/photos');

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
		const photoIds = [];
		for(let i = 0; i < deletedUser.photos.length; i++){
			photoIds.push(deletedUser.photos[i].id);
		}
		
		Photo.remove({
			_id: { $in: photoIds}
		}, (err, data) => {
			res.redirect('/users')
		});
	});
});

// router.delete('/:id', (req, res) => {

//   Author.findByIdAndRemove(req.params.id, (err, deletedAuthor) => {
//     console.log(deletedAuthor, ' this is deletedAuthor');
//     // We are collecting all of the Article Ids from the deletedAuthors
//     // articles property
//     const articleIds = [];
//     for(let i = 0; i < deletedAuthor.articles.length; i++){
//       articleIds.push(deletedAuthor.articles[i].id);
//     }

//     Article.remove({
//       _id: { $in: articleIds}
//     }, (err, data) => {
//       res.redirect('/authors')
//     });
//   });
// });





module.exports = router;