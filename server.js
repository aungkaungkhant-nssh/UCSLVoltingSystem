const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config()
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//test
const userRoute = require('./routes/user/userRoute');
const adminAuthRoute = require('./routes/admin/adminAuthRoute');
const categoryRoute = require("./routes/admin/categoryRoute");
const votedRouted= require('./routes/admin/votedRoute');
const dashboardRoute = require('./routes/admin/dashBoardRoute');

app.use('/api/user',userRoute)
app.use("/api/admin",adminAuthRoute);
app.use("/api/admin/category",categoryRoute)
app.use("/api/admin/voted",votedRouted);
app.use("/api/admin/dashboard",dashboardRoute);

const PORT = process.env.PORT || 8000;

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cme43aq.mongodb.net/${process.env.DB_DEFAULT_DATABASE}?retryWrites=true&w=majority`)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on PORT ${PORT}`)
    })
})
.catch((err)=>{
    console.log(err)
})
