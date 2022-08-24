const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000",
    },
})

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
    console.log("a user connected");
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
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
})