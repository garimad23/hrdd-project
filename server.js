
const express= require("express")
global.express = express;
const app = express()
const PORT= process.env.PORT || 3000

let dotenv = require('dotenv');



// import path library
const path = require("path");
const { rootPath } = require("./libs/pathLib");
// globalise root-directory-path
global.rootPath = rootPath;

// logging
const morgan = require("morgan");

// cors package
const cors = require("cors");
const bodyParser = require('body-parser');

// express-fileupload package
const fileUpload = require("express-fileupload");

// helmet package
const helmet = require("helmet");
const rateLimit = require('express-rate-limit')
const slowDown = require("express-slow-down");
//const csurf =  require('csurf');

// import all routes
const router = require("./routes")

// extract global config
const config = global.config;

// db config
const { dbConnect } = require("./config/db.config.js");

// miscellaneous-controls to set request and response format
const miscControls = require("./controllers/miscController");

// Acessing the environment variable...
dotenv.config();

app.get ("/", (req,res)=>{
    return res.send ("hi everyone")
})






app.listen (PORT, ()=> console.log (`server is running on PORT ${PORT}`));