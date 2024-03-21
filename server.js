
const express= require("express")
const app = express()
const PORT= process.env.PORT || 3000

let dotenv = require('dotenv');


// Acessing the environment variable...
dotenv.config();

app.get ("/", (req,res)=>{
    return res.send ("hi everyone")
})






app.listen (PORT, ()=> console.log (`server is running on PORT ${PORT}`));