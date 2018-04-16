const logs = require('express').Router()
    , MongoClient = require('mongodb').MongoClient;

logs.post('/setLog', (req, res) => {
  console.log('req - > ', req.body);
  res.send('OK');
});

logs.get('/getLog', (req, res) => {
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    const db = client.db('visitorLogs');
    db.collection('logs').find().toArray((err, docs) => {
      console.log('docs - > ', docs);
      res.json(docs);
    });
  });
});

module.exports = logs;
