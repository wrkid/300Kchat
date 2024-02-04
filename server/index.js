const express = require('express');
const mongoose = require('mongoose');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const cookieParser  = require("cookie-parser");
const errorMiddleware = require("./middleware/errorMiddleware");
const socketEvents = require('./socketEvents'); // Импортируем модуль


const authRouter = require('./routers/authRouter');
const chatRouter = require('./routers/chatRouter');

const PORT = 2001;

const corsOptions ={
  origin:'http://localhost:5173', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

const app = express();
const server = createServer(app); // Создаем HTTP-сервер на основе Express-приложения
const io = new Server(server, {
  cors: corsOptions
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.use("/auth", authRouter);
app.use("/chat", chatRouter);


app.use(errorMiddleware);

// Добавляем обработчик для события подключения в Socket.IO
io.on('connection', (socket) => {
  console.log('Sockets connected');

  // Передаем объект io в модуль socketEvents
  socketEvents(io, socket);
});



const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/chat");
    console.log('MONGO_DB CONNECTED')
    server.listen(PORT, () => {
      console.log('server live on ' + PORT);
    });
  } catch (err) {
    console.log(err);
  }
}

start();





