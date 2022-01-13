const mongoose = require('mongoose');
const mongoClient = require("mongodb").MongoClient;
const {ObjectId} = require('mongodb');
const mongoDBConnectionString = "mongodb+srv://userAngular:WZwvyOiJ0J0laJMF@cluster0.cpnre.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;

// Load the schemas
const imageSchema = require('./image-schema.js');
const { request } = require('http');


module.exports = function(mongoDBConnectionString){
  let ImageLiked;

  return {
      connect: function(){
          return new Promise(function(resolve,reject){
              db = mongoose.createConnection(mongoDBConnectionString,{ useNewUrlParser: true, useUnifiedTopology: true });

              db.on('error', (err)=>{
                  reject(err);
              });

              db.once('open', ()=>{
                  //initialize schemas
                  ImageLiked = db.model("User", imageSchema);
                  resolve();
              });
          });
      },

      likedImages: function(date) {
        return new Promise((resolve, reject) => {
          ImageLiked.find({}).exec().then(images => {
            resolve(images);
          }).catch(err => {reject(err)});
      })
      },

      likeImage: function(data) {
        return new Promise((resolve, reject) => {
          let newImage = new ImageLiked(data);
          newImage.save().then(data => {
            resolve("Image liked.")
          }).catch(err => {reject(err)});
      })
      },

      unlikeImage: function(data) {
        return new Promise((resolve, reject) => {
          ImageLiked.deleteOne({ date: data.date}).then(()=>{
            resolve("Image unliked: " + data.date);
          }).catch(err => {
            reject(err)
          });
      })
      },
  }
}
