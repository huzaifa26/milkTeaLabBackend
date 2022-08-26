import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import router from './Routes/routes.js';
import dotenv from 'dotenv';

const corsOptions ={
    origin:'*', 
    // origin:'http://localhost:3000', 
    // origin:'https://huzaifa26.github.io', 
    credentials:true,
    optionSuccessStatus:200
}


const app = express();
dotenv.config();
app.use(express.json());
app.use(cors(corsOptions));

// export var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'root',
//     database : 'milktealab',
//   });

const configuration={
  host     : '35.206.112.94',
  user     : 'u9rxwgdcttirs',
  password : 'uwcvkxbwkysz',
  database : 'dbioubfx6ghrre',
}
  
export var connection;

  // export var connection  = mysql.createPool({
  //   connectionLimit:20,
  //   host     : '35.206.112.94',
  //   user     : 'u9rxwgdcttirs',
  //   password : 'uwcvkxbwkysz',
  //   database : 'dbioubfx6ghrre',
  // });

// export var connection = mysql.createConnection({
//   host     : process.env.HOSTNAME,
//   user     : process.env.USERNAME,
//   password : process.env.PASSWORD,
//   database : process.env.DATABASENAME,
// });


app.get("/",(req,res)=>{
  res.send("working")
})

app.use('/api', router);

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(configuration);

  connection.connect(function(err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }else{
        console.log("connection is successfull");
    }
  });
  connection.on("error", function(err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
handleDisconnect();

// app.listen(process.env.PORT || 5000,()=>{
//   console.log("App listening")
// })


// const app = require('express')();
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// io.on('connection', () => { /* … */ });
// server.listen(3000);

import { createServer } from 'http';
import { Server } from 'socket.io'; //replaces (import socketIo from 'socket.io')

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });


let users=[]

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  };

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    let user=users.find((user) => {
        return +user.userId === +userId
    });
    return user
};

io.on("connection",(socket)=>{
    socket.on("addUser",(userId)=>{
        addUser(userId,socket.id)
        io.emit("getUsers",users);
    })

    socket.on("sendMessage", ({ senderId, recieverId, text }) => {
        const user = getUser(recieverId);
        io.to(user?.socketId).emit("getMessage", {
          senderId,
          text,
        });
    });

    socket.on("disconnect", () => {
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
})

app.set('port', process.env.PORT || 5000);

httpServer.listen(app.get('port'), function () {
  var port = httpServer.address().port;
  console.log('Running on : ', port);
});