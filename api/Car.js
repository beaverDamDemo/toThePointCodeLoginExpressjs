const express = require('express');
const router = express.Router();
const Car = require('./../models/Car');
const bcrypt = require('bcrypt');

router.post('/save-game-results', (req, res) => {
  let { data } = req.body;

  for (let i = 0; i < data.cars.length; i++) {
    Car.find({ name: data.cars[i].name, cardsPack: data.cardsPack })
      .then((documents) => {
        const tmpLost =
          parseInt(documents[0].duelsLost) + parseInt(data.cars[i].duelsLost);
        const tmpTie =
          parseInt(documents[0].duelsTie) + parseInt(data.cars[i].duelsTie);
        const tmpWon =
          parseInt(documents[0].duelsWon) + parseInt(data.cars[i].duelsWon);
        Car.updateOne(
          { name: data.cars[i].name, cardsPack: data.cardsPack },
          {
            dueslLost: tmpLost,
            duelsTie: tmpTie,
            duelsWon: tmpWon,
          },
        )
          .then(() => console.log('Card updated'))
          .catch((err) => console.error(err));
      })
      .catch((err) => {
        const newCar = new Car({
          name: data.cars[i].name,
          duelsWon: data.cars[i].duelsWon,
          duelsLost: data.cars[i].duelsLost,
          duelsTie: data.cars[i].duelsTie,
          cardsPack: data.cardsPack,
        });

        newCar
          .save()
          .then(() => console.log('Car saved to database'))
          .catch((err) => console.error(err));

        console.error('Error getting document ', err);
      });
  }
});

router.get('/cards-stats', (req, res) => {
  Car.find()
    .then((data) => {
      res.json({
        status: 'SUCCESS',
        message: 'Cards stats retrieve successful',
        data: data,
      });
    })
    .catch((err) => {
      console.error('Error getting document ', err);
    });
});

router.get('/empty-cards-stats', (req, res) => {
  Car.deleteMany({})
    .then((data) => {
      console.log('data: ', data);
      res.json({
        status: 'SUCCESS',
        message: 'Cards stats empty successful',
        data: data,
      });
    })
    .catch((err) => {
      console.error('Error getting document ', err);
    });
});

module.exports = router;
