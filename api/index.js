const mongoDBConnectionString = "mongodb+srv://spacee:admin@spaceec.pqxsy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dataService = require("./modules/data-service.js");
const data = dataService(mongoDBConnectionString);
const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());


const http = require('http');
const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient(mongoDBConnectionString);

// Liked images
app.get("/api/image", (req,res)=> {
  data.likedImages().then((images) => {
    res.json(images)
  }).catch((msg)=> {
    res.status(422).json({ "message": msg });
  })
});

// Like an image
app.post("/api/image-like", (req,res)=> {
  data.likeImage(req.body).then((msg) => {
    res.json({message: msg})
  }).catch((msg)=> {
    res.status(422).json({ "message": msg });
  })
});

// Unlike an image
app.post("/api/image-unlike", (req,res)=> {
  data.unlikeImage(req.body).then((msg) => {
    res.json({message: msg})
  }).catch((msg)=> {
    res.status(422).json({ "message": msg });
  })
});

data.connect().then(()=> {
  app.listen(HTTP_PORT, ()=>{console.log("API listening on: " + HTTP_PORT)});
})
.catch((err)=>{
    console.log("unable to start the server: " + err);
    process.exit();
});
