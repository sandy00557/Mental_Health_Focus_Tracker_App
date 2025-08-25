// const mongoose=require('mongoose');
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// const dotenv=require('dotenv');

dotenv.config({path:'./config.env'});
// const app=require('./app');
import app from './app.js';

const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(con=>{
    console.log(con.connections);
    console.log("DB connection successful");
    console.log(process.env.JWT_SECRET); // Should print the value from config.env
}).catch(err=>console.error('Mongodb connection failed:',err));



const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server runnning on Port ${PORT}`);
})