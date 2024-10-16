const  express = require('express');
const mongoose =  require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors'); 
const authRout = require('./router/authRoute.js');
const postRout = require("./router/postRoute.js");
const path = require('path');
const app =  express();
app.use(cookieParser());

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  }));

require('dotenv').config();
mongoose.connect(process.env.DB).then(()=>{
    console.log("Db connected!!");
}).catch((e)=>{
    console.log(e);
});
app.listen(5000  , () => {
    console.log("server started");
});


app.use('/auth/user' , authRout);
app.use('/auth/post' , postRout);

