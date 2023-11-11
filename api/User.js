const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res) => {
	let { name, email, password, dateOfBirth } = req.body;
	name = name.trim();
	email = email.trim();
	password = password.trim();
	dateOfBirth = dateOfBirth.trim();
	if (name == "" || email == "" || password == "" || dateOfBirth == "") {
		res.json({
			status: "FAILED",
			message: "Empty input fields!",
		});
	} else if (!/^[a-zA-z0-9]*$/.test(name)) {
		res.json({
			status: "FAILED",
			message: "Invalid name entered",
		});
	} else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
		res.json({
			status: "FAILED",
			message: "Invalid email entered",
		});
	} else if (!new Date(dateOfBirth).getTime()) {
		res.json({
			status: "FAILED",
			message: "Invalid date of birth entered",
		});
	} else if (password.length < 2) {
		res.json({
			status: "FAILED",
			message: "Password too short",
		});
	} else {
		User.find({ email })
		.then((result) => {
			if (result.length) {
				console.log("FAILED Looks like email already exists");
				res.json({
					status: "FAILED",
					message: "Looks like email already exists",
				});
			} else {
				console.log("creating new user");
          // creating new user
				const saltRounds = 10;
				bcrypt
				.hash(password, saltRounds)
				.then((hashedPassword) => {
					const newUser = new User({
						name,
						email,
						password: hashedPassword,
						dateOfBirth,
					});
					newUser
					.save()
					.then((result) => {
						res.json({
							status: "SUCCESS",
							message: "Signup OK",
							data: result,
						});
					})
					.catch((e) => {
						res.json({
							status: "FAILED",
							message: "An error occurred while saving new user!",
						});
					});
				})
				.catch((e) => {
					res.json({
						status: "FAILED",
						message: "An error occurred while hashing password!",
					});
				});
			}
		})
		.catch((err) => {
			res.json({
				status: "FAILED",
				message: "Error while checking if user already exists",
			});
		});
	}
});

router.post("/signin", (req, res) => {
	let { email, password } = req.body;
	email = email.trim();
	password = password.trim();

	if (email == "" || password == "") {
		res.json({
			status: "FAILED",
			message: "Empty credentials supplied",
		});
	} else {
		User.find({ email })
		.then((data) => {
			if (data) {
				const hashedPassword = data[0].password;
				bcrypt
				.compare(password, hashedPassword)
				.then((result) => {
					if (result) {
						res.json({
							status: "SUCCESS",
							message: "Signin successful",
							data: data,
						});
					} else {
						res.json({
							status: "FAILED",
							message: "Invalid password entered!",
						});
					}
				})
				.catch((err) => {
					res.json({
						status: "FAILED",
						message: "An error occurred while comparing passwords",
					});
				});
			} else {
				res.json({
					status: "FAILED",
					message: "Invalid credentials entered!",
				});
			}
		})
		.catch((err) => {
			res.json({
				status: "FAILED",
				message: "An error occurred while checking for existing user",
			});
		});
	}
});

module.exports = router;
