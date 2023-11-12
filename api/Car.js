const express = require("express");
const router = express.Router();
const Car = require("./../models/Car");
const bcrypt = require("bcrypt");

router.post("/save-game-results", (req, res) => {
	let { data } = req.body;
	for(let i=0; i<data.cars.length; i++) {
		const newCar = new Car({
			id: data.cars[i].id,
			name: data.cars[i].name,
			zyl: data.cars[i].zyl,
			kw: data.cars[i].kw,
			ccm: data.cars[i].ccm,
			kmh: data.cars[i].kmh,
			firstChoice: data.cars[i].firstChoice,
			secondChoice: data.cars[i].secondChoice,
			duelsWon: data.cars[i].duelsWon,
			duelsLost: data.cars[i].duelsLost,
			duelsTie: data.cars[i].duelsTie,
			cardsPack: data.cardsPack
		});	
		newCar.save()
		.then(() => console.log('Car saved to database'))
		.catch((err) => console.error(err));
	}



// Card.updateOne({ name: 'Ace of Spades' }, { $inc: { wins: 1 } })
//   .then(() => console.log('Card updated'))
//   .catch((err) => console.error(err));

// Card.find({ name: 'Ace of Spades', wins: 3 }, function (err, cards) {
//   if (err) return console.error(err);
//   console.log(cards);
// });



	// email = email.trim();

	// if (email == "" ) {
	// 	res.json({
	// 		status: "FAILED",
	// 		message: "Empty credentials supplied",
	// 	});
	// } else {
	// 	User.find({ email })
	// 	.then((data) => {
	// 		if (data) {
	// 			res.json({
	// 				status: "SUCCESS",
	// 				message: "User data retrieve successful",
	// 				data: data,
	// 			});

	// 		} else {
	// 			res.json({
	// 				status: "FAILED",
	// 				message: "Error getting user data",
	// 			});
	// 		}
	// 	})
	// 	.catch((err) => {
	// 		res.json({
	// 			status: "FAILED",
	// 			message: "An error occurred while checking for user data",
	// 		});
	// 	});
	// }
});

module.exports = router;
