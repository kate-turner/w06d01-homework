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

router.get("/:id/edit", (req, res) => {
	Photo.findById(req.params.id, (err, editPhoto) => {
		res.render("photos/edit.ejs", {
			photo: editPhoto
		});
	});
});

router.put("/:id", (req, res) => {
	Photo.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPhoto) => {
		console.log(updatedPhoto);
		res.redirect("/photos");
	});
});

router.delete("/:id", (req, res) => {
	Photo.findByIdAndRemove(req.params.id, (err, deletedPhoto) => {
		console.log(deletedPhoto);
		res.redirect('/photos')
	});
});



module.exports = router;