const express = require('express');
const router = express.Router();
const Photo = require('../models/photos');
// const User = require('../models/photos.js');


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
	res.render("photos/new.ejs")
});

router.post("/", (req, res) => {
	Photo.create(req.body, (err, createdPhoto) => {
		console.log(createdPhoto, 'this is the createdPhoto');
		res.redirect('/photos');
	});
});

router.get("/:id", (req, res) => {
	Photo.findById(req.params.id, (err, foundPhoto) => {
		res.render("photos/show.ejs", {
			photo: foundPhoto
		});
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