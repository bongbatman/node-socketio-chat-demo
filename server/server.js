//no need of any exports as its a relative file too generic
require('../config/config'); //without this the file will never run


const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {isRealString} = require('./utils/validation');
const {generateMsg, generateLocMsg} = require('./utils/msg');
const {Users} = require('./utils/users');
console.log(publicPath);

const app = express();
const server = http.createServer(app);//express uses http in bg so we can just pass app as argument
let io = socketIO(server);
let users = new Users();

const port = process.env.PORT;

//app static middleware path
app.use(express.static(publicPath));

/**
 * way to register an event listener from server side
 */
io.on('connection', (socket) => {
    console.log("new user connected"); //registers an event listener

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
           return callback("Name and Room name are required") // never forget return baba
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        // console.log(users.getUserList(params.roomName));

        //now to send to a room this syntax has to used
        io.in(params.room).emit('updateUserList', users.getUserList(params.room));

        //socket.leave("office room") ---> leaves room

        //io.emit() ----> io.to(socket.id).emit() -----> emits private msg to a socket id
        //socket.broadcast.emit() -----> socket.broadcast.to(params.room).emit() -----> everyone but the one sending


        //welcome new user
        socket.emit('newMsg', generateMsg("Admin", "Welcome to chat app"));

        //broadcast new user to others
        socket.broadcast.to(params.room).emit('newMsg', generateMsg("Admin", `${params.name} has joined`));
        callback();
    } );

    /**
     * emit custom event
     */
    // socket.emit('email', {
    //     from: "nish05@gmail.com",
    //     text: "Hey what's up",
    //     createdAt: 1999
    // });




    socket.on('createMsg', (msg, callback) => {
        console.log(msg);
        /**
         * io.emit emits the msg to every connection
         */
        io.emit('newMsg', generateMsg(msg.from, msg.text));
        // callback("This is from server");
        callback();
        /**
         * this is the way to broadcast events to everyone except the one who sent it
         */
        // socket.broadcast.emit('newMsg', {
        //         from: msg.from,
        //         text: msg.text,
        //         createdAt: new Date().getTime()
        //     });

    });


    socket.on('createLocMsg', (coords) => {
        io.emit('newLocMsg', generateLocMsg("User", coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
       let user = users.removeUser(socket.id);

       if (user) {
           io.in(user.roomName).emit('updateUserList', users.getUserList(user.roomName));
           io.in(user.roomName).emit('newMsg', generateMsg("Admin", `${user.name} has left`));
       }

    });

    /**
     * listening to custom event emitted from client
     */
    // socket.on('createEmail', (emailData) => {
    //     console.log(emailData);
    //
    //     //can emit new event after a certain event. But it emits event only to single connection or event
    //     // socket.emit('email', emailData);
    // });

});

server.listen(port, () => {
   console.log(`Listening on port: ${port}`);
});
