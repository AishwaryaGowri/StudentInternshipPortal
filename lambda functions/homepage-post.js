"use strict";
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = "mongodb+srv://dbuser:dbpassword@cluster0-xnifl.mongodb.net/test?retryWrites=true&w=majority"; 
let cachedDb = null;

function connectToDatabase (uri) {
  console.log('=> connect to database');

  if (cachedDb) {
    console.log('=> using cached database instance');
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(uri).then(db => {
    cachedDb = db.db('pro');
    return cachedDb;
  });
}
 
function queryDatabase (db,body) {
    console.log('=> query database');
    console.log(body);
    const collection = db.collection('home');
      // Find some documents'
    collection.updateOne({ USN :body.USN}
        , { $set: {"internship.0.company":body.comp_name ,"internship.0.stipend":body.stipend , "internship.0.sem":body.sem} });
        return "success";
  }
  
  module.exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
    let body=event;
  
    connectToDatabase(MONGODB_URI)
      .then(db => queryDatabase(db,body))
      .then(result => {
        console.log('=> returning result: ', result);
        callback(null,result);
      })
      .catch(err => {
        console.log('=> an error occurred: ', err);
        callback(err);
      });
  };