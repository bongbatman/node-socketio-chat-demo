//no need of any exports as its a relative file too generic
require('../config/config'); //without this the file will never run


const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
console.log(publicPath);

const app = express();
const server = http.createServer(app);//express uses http in bg so we can just pass app as argument
let io = socketIO(server);

const port = process.env.PORT;

//app static middleware path
app.use(express.static(publicPath));

/**
 * way to register an event listener from server side
 */
io.on('connection', (socket) => {
    console.log("new user connected"); //registers an event listener


    /**
     * emit custom event
     */
    // socket.emit('email', {
    //     from: "nish05@gmail.com",
    //     text: "Hey what's up",
    //     createdAt: 1999
    // });


    socket.on('createMsg', (msg) => {
        console.log(msg);
        /**
         * io.emit broadcasts the msg to every connection
         */
        io.emit('newMsg', {
            from: msg.from,
            text: msg.text,
            createdAt: new Date().getTime()
        })

    });
    socket.on('disconnect', () => {
       console.log("User was disconnected");
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
