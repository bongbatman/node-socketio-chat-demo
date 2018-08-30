//no need of any exports as its a relative file too generic
require('../config/config'); //without this the file will never run


const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
console.log(publicPath);

const app = express();
const port = process.env.PORT;

//app static middleware path
app.use(express.static(publicPath));

app.listen(port, () => {
   console.log(`Listening on port: ${port}`);
});
