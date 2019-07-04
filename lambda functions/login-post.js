"use strict";
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = "mongodb+srv://dbuser:<password>@cluster0-xnifl.mongodb.net/test?retryWrites=true&w=majority"; 

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
  
  const collection = db.collection('home');
    // Find some documents
   return collection.find({"USN":body.USN}).toArray()
    .catch(err => {
      console.log('=> an error occurred: ', err);
      return { statusCode: 500, body: 'error' };
    });
}

module.exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const body=event;

  connectToDatabase(MONGODB_URI)
    .then(db => queryDatabase(db,body))
    .then(result => {
      console.log('=> returning result: ', result);
      callback(null, result);
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      callback(err);
    });
};