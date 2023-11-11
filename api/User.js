const express = require('express')
const router = express.Router();
const User =  require('./../models/User')
const bcrypt = require('bcrypt')

router.post('/signup', (req, res)=>{

	console.log("req.body: ", req.body)


	let {name, email, password, dateOfBirth} = req.body;
	console.log("req.body: ", name)
	console.log("req.body: ", email)
	console.log("req.body: ", password)
	console.log("req.body: ", dateOfBirth)

	name = name.trim();
	email = email.trim();
	password = password.trim();
	dateOfBirth = dateOfBirth.trim();
	if(name == "" || email == "" || password == "" || dateOfBirth == "") {
		res.json({
			status: "FAILED",
			message: "Empty input fields!"
		})
	} else if(!/^[a-zA-z]*$/.test(name)) {
		res.json({
			status: "FAILED",
			message: "Invalid name entered"
		})
	}else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
		res.json({
			status: "FAILED",
			message: "Invalid email entered"
		})
	} else if(!new Date(dateOfBirth).getTime()) {
		res.json({
			status: "FAILED",
			message: "Invalid date of birth entered"
		})
	} else if(password.length < 2){
		res.json({
			status: "FAILED",
			message: "Password too short"
		})
	} else {
		User.find({email}).then(result=>{
			if(result.length) {
				res.json({
					status: "FAILED",
					message: "Looks like email already exists"
				})
			} else {
				// creating new user
				const saltRounds = 10;
				bcrypt.hash(password, saltRounds).then(hashedPassword=>{
					const newUser = new User({
						name, email, password: hashedPassword, dateOfBirth
					})
					newUser.save().then(result=>{
						res.json({
							status: "SUCCESS",
							message: "Signup OK", data: result})
					}).catch(e=>{
						res.json({
							status: "FAILED",
							message: "An error occurred while saving new user!"
						})	
					})
				})
				.catch(e=>{
					res.json({
						status: "FAILED",
						message: "An error occurred while hashing password!"
					})	
				})
			}
		}).catch(err=>{
			res.json({
				status: "FAILED",
				message: "Error while checking if user already exists"
			})	
		})
	}
})

router.post('/signin', (req, res)=>{

})

module.exports = router;