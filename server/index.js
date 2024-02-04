const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser  = require("cookie-parser");
const errorMiddleware = require("./middleware/errorMiddleware");


const authRouter = require('./authRouter');

const PORT = process.env.PORT || 2001;

const app = express();

const corsOptions ={
  origin:'http://localhost:5173', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRouter);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/chat");
    console.log('MONGO_DB CONNECTED')
    app.listen(PORT, () => {
      console.log('server live on ' + PORT);
    })
  } catch (err) {
    console.log(err);
  }
}

start();





