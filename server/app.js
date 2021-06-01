require('dotenv').config({ path: './config/.env' });

//backage
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const AuthRoutes = require('./router/AuthRoute')

const app = express();
const Port = process.env.Port || 5000; 

//midlware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes 
app.use('/api', AuthRoutes);

app.get("/jjjjjjj",(req,res)=>{res.send('hi from jjjjj')})

//app express
app.listen(Port, () =>{
    console.log(`app listning : localhost : ${Port}`);
})
