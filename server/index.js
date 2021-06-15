const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cookieparser = require('cookie-parser');

dotenv.config({path:'./config.env'});
require('./db/conn'); 
app.use(express.json());
app.use(cookieparser())

//i link the router file to make our route
app.use(require('./router/auth'));


const PORT = process.env.PORT||5000;

//3 step of heroku
if(process.env.NODE_ENV==="production")
{
    app.use(express.static("client/build"))
}

app.listen(PORT,()=>{
    console.log(`Server is listening at the port ${PORT}`);
})