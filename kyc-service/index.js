const express = require("express");
require('dotenv').config();
global.__basedir = __dirname;
const hostname = process.env.HOST;
const port = process.env.PORT;
const cors = require("cors");
const multer = require('multer');
const fs = require('fs');
const ipfsClient = require('ipfs-http-client');

const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var uuidv4 = require('uuid').v4;
const bodyParser = require("body-parser");
const { response } = require("express");

const customerInfoService = require('./services/getcustomerinfo');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload({
  createParentPath: true
}));
// Define Express app settings
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set("title", "KYC App");
app.use(cors({
  exposedHeaders: ['Content-Disposition'],
}));

app.get("/", (req, res) => res.json("hello ding"));
    
    app.get('/clientInfo/:clientId', async (req, res) => {
      const clientId = req.params.clientId;
      console.log("insiode server client info.. ",clientId);
       await customerInfoService
        .execute(clientId)
        .then((customerInfo) => {
          console.log("customer information retrieved successfully....",customerInfo);
          res.json(customerInfo);
        })
        .catch((e) => {
          const errorDetails = {
            status: "error",
            message: "Failed",
            error: e,
          };
          res.status(500).send(errorDetails);
        }); 
    });

    http.listen(port,hostname, ()=> {
      console.log(`Server running at http://${hostname}:${port}/`);
    });