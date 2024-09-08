const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res) => {
	let { name, email, password, dateOfBirth } = req.body;
	name = name.trim();
	email = email.trim();
	password = password.trim();
	if (name == "" || email == "" || password == "") {
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
				const saltRounds = 10;
				bcrypt
				.hash(password, saltRounds)
				.then((hashedPassword) => {
					const newUser = new User({
						name,
						email,
						password: hashedPassword,
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

router.post("/user-info", (req, res) => {
	let { email } = req.body;
	email = email.trim();

	if (email == "" ) {
		res.json({
			status: "FAILED",
			message: "Empty credentials supplied",
		});
	} else {
		User.find({ email })
		.then((data) => {
			if (data) {
				res.json({
					status: "SUCCESS",
					message: "User data retrieve successful",
					data: data,
				});

			} else {
				res.json({
					status: "FAILED",
					message: "Error getting user data",
				});
			}
		})
		.catch((err) => {
			res.json({
				status: "FAILED",
				message: "An error occurred while checking for user data",
			});
		});
	}
});

router.post("/save-user-result", (req, res) => {
	let { hasUserWon, email } = req.body;
	email = email.trim();
	User.find({ email })
	.then((documents) => {
		if(hasUserWon) {
			if(documents[0].matchesWon) {
				const tmpWon = parseInt(documents[0].matchesWon) + parseInt(1);
				User.updateOne({ email: email }, { 
					matchesWon: tmpWon
				})
				.then(() => {
					console.log('user updated')
					res.json({
						status: "SUCCESS",
						message: "User matches lost or won update successful",
						data: data,
					});
				})
				.catch(e=>{}) 
			} else {
				User.updateOne({ email: email }, { 
					matchesWon: 1
				})
				.then(() => {
					console.log('user updated')
					res.json({
						status: "SUCCESS",
						message: "User matches lost or won update successful",
						data: data,
					});
				})
				.catch(e=>{}) 
			}
		} else {
			if(documents[0].matchesLost) {
				const tmpLost = parseInt(documents[0].matchesLost) + parseInt(1);
				User.updateOne({ email: email }, { 
					matchesLost: tmpLost
				})
				.then(() => {
					console.log('user updated')
					res.json({
						status: "SUCCESS",
						message: "User matches lost or won update successful",
						data: data,
					});
				})
				.catch(e=>{}) 
			} else {
				User.updateOne({ email: email }, { 
					matchesLost: 1
				})
				.then(() => {
					console.log('user updated')
					res.json({
						status: "SUCCESS",
						message: "User matches lost or won update successful",
						data: data,
					});
				})
				.catch(e=>{}) 
			}
		}
	})
	.catch((err) => {
		console.error(err);
		res.json({
			status: "FAILED",
			message: "An error occurred while saving user result",
		});
	});
});
module.exports = router;

