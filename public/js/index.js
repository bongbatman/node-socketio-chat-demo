//frontend javascript
let socket = io(); //initiates a request to open a connection

/**
 * way to do something on event on client side
 */

//es6 syntax works only in chrome or certain new browsers we have to use es5 regular syntax
socket.on('connect', function () {
    console.log("Connected to server: ", socket.connected);

    // socket.emit('createEmail',{
    //        from: "billu@gmail.com",
    //        text: "Hi from client",
    //        createdAt: 2000
    //    });



});

socket.on('disconnect', function () {
    console.log("Disconnected from server");
});

/**
 * Custom events
 */
// socket.on('email', function (email) {
//     console.log(`New email received from ${email.from}: \n ${email.text}`);
// });
socket.on('newMsg', function (msg) {
   console.log(`${msg.from} says: ${msg.text} at ${new Date(msg.createdAt)}`);
});

//welcome new user
socket.on('welcome', function (msg) {
    console.log(msg);
});

//broadcast new user to others
socket.on('newUserJoined', function (msg) {
    console.log(msg);
});