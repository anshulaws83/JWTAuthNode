const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

//Importing Routes
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');


//COnnect DB
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () =>{
    console.log('Connected to DB');
})


//Middleware
app.use(express.json());


//Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postsRoute);


app.listen(3000, () => {
    console.log('Server up and running');
})