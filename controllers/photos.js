const express = require('express');
const router = express.Router();
const Photo = require('../models/photos');
const User = require('../models/users');


router.get("/", (req, res) => {
		Photo.find({}, (err, foundPhotos) => {
			if(err){
			console.log(err, 'this in photo find')
			} res.render("photos/index.ejs", {
				photos: foundPhotos
				});
			});
	});
	

router.get("/new", (req, res) => {
	User.find({}, (err, allUsers)=> {
		console.log(allUsers);
		res.render("photos/new.ejs", {
			users: allUsers
			});	
		});
	});
	
router.post("/", (req, res) => {
	User.findById(req.body.userId, (err, foundUser)=>{
		Photo.create(req.body, (err, createdPhoto) => {
			foundUser.photos.push(createdPhoto);
			foundUser.save((err, data)=>{
				console.log(createdPhoto, 'this is the createdPhoto');
				res.redirect('/photos');
			});
		});
	});
});

router.get("/:id", (req, res) => {
	Photo.findById(req.params.id, (err, foundPhoto) => {
		User.findOne({'photos._id':req.params.id}, (error, foundUser)=>{
			res.render("photos/show.ejs", {
				user: foundUser,
				photo: foundPhoto
			});
		})
	});
});

// router.get("/:id/edit", (req, res) => {
// 	Photo.findById(req.params.id, (err, foundPhoto) => {
// 		User.find({}, (err, allUsers)=>{
// 			User.findOne({'photos._id':req.params.id}, (err, foundPhotoUser)=>{
// 				res.render('photos/edit.ejs', {
// 					photo: foundPhoto,
// 					users: allUsers,
// 					photoUser: foundPhotoUser
// 				});
// 			});
// 		});
// 	});
// });


router.get('/:id/edit', (req, res)=>{
	Photo.findById(req.params.id, (err, foundPhoto)=>{
		User.find({}, (err, allUsers)=>{
			User.findOne({'photos._id':req.params.id}, (err, foundPhotoUser)=>{
				res.render('photos/edit.ejs', {
					photo: foundPhoto,
					users: allUsers,
					photoUser: foundPhotoUser
				});
			});
		});
	});
});
	




router.put("/:id", (req, res) => {
	Photo.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPhoto) => {
		User.findOne({'photos._id' : req.params.id }, (err, foundUser)=>{
	if(foundUser._id.toString() !== req.body.userId){
		foundUser.photos.id(req.params.id).remove();
		foundUser.save((err, savedFoundUser)=>{
						console.log(savedFoundUser, 'this is the savedFoundUser');
			User.findById(req.body.userId, (err, newUser)=>{
				console.log(newUser, 'this is the newUser');
				newUser.photos.push(updatedPhoto);
				newUser.save((err, savedFoundUser)=>{
					console.log(err, "this is savedFoundUser part 2")
					res.redirect('/photos/'+req.params.id);
				});
			});
		});
	} else {
		foundUser.photos.id(req.params.id).remove();
			foundUser.photos.push(updatedPhoto);
			foundUser.save((err, data)=>{
				console.log(err, " This is the data bitches!")
				res.redirect('/photos/'+req.params.id);
			});
			}
		});
	});
});


// router.put('/:id', (req, res)=>{
//     Article.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedArticle)=>{
//         Author.findOne({ 'articles._id' : req.params.id }, (err, foundAuthor)=>{
// 		if(foundAuthor._id.toString() !== req.body.authorId){
// 			foundAuthor.articles.id(req.params.id).remove();
// 			foundAuthor.save((err, savedFoundAuthor)=>{
// 				Author.findById(req.body.authorId, (err, newAuthor)=>{
// 					newAuthor.articles.push(updatedArticle);
// 					newAuthor.save((err, savedNewAuthor)=>{
// 			        	        res.redirect('/articles/'+req.params.id);
// 					});
// 				});
// 			});
// 		} else {
// 			foundAuthor.articles.id(req.params.id).remove();
// 			foundAuthor.articles.push(updatedArticle);
// 			foundAuthor.save((err, data)=>{
// 		                res.redirect('/articles/'+req.params.id);
// 			});
// 		}
//         });
//     });
// });

router.delete("/:id", (req, res) => {
	Photo.findByIdAndRemove(req.params.id, (err, deletedPhoto) => {
		User.findOne({'photos._id':req.params.id}, (err, foundUser)=>{
			foundUser.photos.id(req.params.id).remove();
			foundUser.save((err, data)=>{
				res.redirect('/photos')
			});
		});
	});
});




module.exports = router;