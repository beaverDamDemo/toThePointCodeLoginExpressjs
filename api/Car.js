const express = require("express");
const router = express.Router();
const Car = require("./../models/Car");
const bcrypt = require("bcrypt");

router.post("/save-game-results", (req, res) => {
	let { data } = req.body;

	for(let i=0; i<data.cars.length; i++) {
		// const newCar = new Car({
		// 	id: data.cars[i].id,
		// 	name: data.cars[i].name,
		// 	zyl: data.cars[i].zyl,
		// 	kw: data.cars[i].kw,
		// 	ccm: data.cars[i].ccm,
		// 	kmh: data.cars[i].kmh,
		// 	firstChoice: data.cars[i].firstChoice,
		// 	secondChoice: data.cars[i].secondChoice,
		// 	duelsWon: data.cars[i].duelsWon,
		// 	duelsLost: data.cars[i].duelsLost,
		// 	duelsTie: data.cars[i].duelsTie,
		// 	cardsPack: data.cardsPack
		// });	

		// newCar.save()
		// .then(() => console.log('Car saved to database'))
		// .catch((err) => console.error(err));

		Car.find({ name: data.cars[i].name, cardsPack: data.cardsPack })
		.then((documents) => {
			const tmpLost = parseInt(documents[0].duelsLost) + parseInt(data.cars[i].duelsLost);
			const tmpTie = parseInt(documents[0].duelsTie) + parseInt(data.cars[i].duelsTie);
			const tmpWon = parseInt(documents[0].duelsWon) + parseInt(data.cars[i].duelsWon);
			Car.updateOne({ name: data.cars[i].name, cardsPack: data.cardsPack }, { 
				dueslLost: tmpLost,
				duelsTie: tmpTie,
				duelsWon: tmpWon
			})
			.then(() => console.log('Card updated'))
			// .catch((err) => console.error(err));
		})
		.catch((err) => {
			const newCar = new Car({
				name: data.cars[i].name,
				duelsWon: data.cars[i].duelsWon,
				duelsLost: data.cars[i].duelsLost,
				duelsTie: data.cars[i].duelsTie,
				cardsPack: data.cardsPack
			});	

			newCar.save()
			.then(() => console.log('Car saved to database'))
			// .catch((err) => console.error(err));

			console.error("Error getting document ", err);	
		})
	}
});

module.exports = router;
