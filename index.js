require('./config/db');
const express = require('express');
const app = express();
const port = 3000;
const UserRouter = require('./api/User');
const CarRouter = require('./api/Car');
const bodyParser = require('express').json;
const cors = require('cors');
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// app.use(bodyParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', UserRouter);
app.use('/car', CarRouter);

app.get('/sample', (req, res) => {
  res.json({ message: 'Sample: This is CORS-enabled for all origins!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
