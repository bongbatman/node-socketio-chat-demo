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
   let li = jQuery('<li></li>');
   li.text(`${msg.from}: ${msg.text}`);

   jQuery('#messages').append(li);

});

socket.on('newLocMsg', function (msg)  {
    let li = jQuery('<li></li>');

    //_blank tells browser to open new tab instead of redirecting current tab
    let a = jQuery('<a target="_blank">My Current Location</a>');

    //using these methods instead of template string injection keeps others from injecting into this code
    li.text(`${msg.from}: `);
    a.attr('href', msg.url);
    li.append(a);
    jQuery('#messages').append(li);
});

/**
 * Event with acknowledgement with call back function
 */
// socket.emit('createMsg', {
//    from: "Karan",
//    text: "hi"
// }, function (data) {
//     console.log(`Got it (${data})`);
// });



//welcome new user
// socket.on('welcome', function (msg) {
//     console.log(msg);
// });

//broadcast new user to others
// socket.on('newUserJoined', function (msg) {
//     console.log(msg);
// });

/**
 * basic jQuery event using the id of element
 */
let msgTxtBox = jQuery('[name=message]'); //get reference to msg here

jQuery('#message-form').on('submit', function (e) { //selecting by id
   e.preventDefault();
    socket.emit('createMsg', {
        from: "User",
        text: msgTxtBox.val() //selecting by name
    }, function (data) {

        //clear the value on acknowledgement from server
        // console.log(`Got it (${data})`);
        msgTxtBox.val('');
    });
});


//location button
let locationBtn = jQuery('#send-location');

locationBtn.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported');
    }

    locationBtn.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (pos) {
        console.log(pos);
        locationBtn.removeAttr('disabled').text('Send Location');// enables button
        socket.emit('createLocMsg', {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        })
    }, function () {
        locationBtn.removeAttr('disabled').text('Send Location');//enables button
       alert('Unable to fetch location') ;
    });
});

