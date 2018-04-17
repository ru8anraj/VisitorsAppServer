const logs = require('express').Router()
    , MongoClient = require('mongodb').MongoClient;

logs.post('/setLog', (req, res) => {
  console.log('req - > ', req.body);
  var date = new Date();
  var dateStr = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
  var emailFull = req.body.email+'@'+req.body.emailProvider;

  var obj = {
    name: req.body.name,
    vertical: 'CBU-'+req.body.vertical,
    email: emailFull,
    date: dateStr,
    feel: req.body.feel,
    comment: req.body.comment
  }
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    const db = client.db('visitorLogs');
    db.collection('logs').insert(obj, (err, reply) => {
      if (err) {
        console.log('Error in saving - > ', err);
      } else {
        console.log('reply - > ', reply);
        res.send('OK');
      }
    });
  });
});

logs.get('/getLog', (req, res) => {
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    const db = client.db('visitorLogs');
    db.collection('logs').find().toArray((err, docs) => {
      console.log('docs - > ', docs);
      var invertedDoc = [];
      docs.map((item) => {
        invertedDoc.unshift(item);
      });
      res.json(invertedDoc);
    });
  });
});

module.exports = logs;
