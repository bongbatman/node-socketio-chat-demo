let env = process.env.NODE_ENV || "development";

if (env === "development" || env === "test") {
    let config = require('./config.json');//maps the json to js object
    let envConfig = config[env];//bracket notation to get test or development
    // console.log(Object.keys(envConfig));//returns the array of keys of object

    //loops over each depending on environment and sets
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });

}