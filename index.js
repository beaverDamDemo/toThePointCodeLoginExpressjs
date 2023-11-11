require('./config/db')
const app = require('express')();
const port = 3000;
const UserRouter = require('./api/User');
const bodyParser = require('express').json;
app.use(bodyParser())

app.use('/User', UserRouter)

app.listen(port, ()=>{
	console.log(`Server is running on port ${port}`);
})