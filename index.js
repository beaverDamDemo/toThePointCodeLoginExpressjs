require('./config/db')
const express = require('express')
const app = require('express')();
const port = 3000;
const UserRouter = require('./api/User');
const CarRouter = require('./api/Car');
const bodyParser = require('express').json;
const cors = require('cors')
const corsOptions = {
	origin: ["http://localhost:4200", "https://beaverdamdemo.github.io/piatnik-turbos"],
	optionsSuccessStatus: 200
}
// app.use(bodyParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/User', cors(corsOptions), UserRouter)
app.use('/Car', cors(corsOptions), CarRouter)

app.listen(port, ()=>{
	console.log(`Server is running on port ${port}`);
})