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
  var obj1 = {};
  if (req.body.feel === 1) {
    obj1 = {"feel.1": 1};
  } else if (req.body.feel === 2) {
    obj1 = {"feel.2": 1};
  } else if (req.body.feel === 3) {
    obj1 = {"feel.3": 1};
  } else if (req.body.feel === 4) {
    obj1 = {"feel.4": 1};
  } else if (req.body.feel === 5) {
    obj1 = {"feel.5": 1};
  }

  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    const db = client.db('visitorLogs');
    db.collection('logs').insert(obj, (err, reply) => {
      if (err) {
        console.log('Error in saving - > ', err);
      } else {
        console.log('reply - > ', reply);
        db.collection('feelCount').update({key: 'feelCount'}, {$inc: obj1}, {upsert: true}, (err, rep) => {
          if (err) {
            console.log('Error in updating feel count - > ', err);
          } else {
            res.send('OK');
          }
        });
      }
    });
  });
});

logs.get('/getLog', (req, res) => {
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    const db = client.db('visitorLogs');
    db.collection('logs').find().toArray((err, docs) => {
      console.log('docs - > ', docs);
      var invertedDoc = docs.reverse();
      res.json(invertedDoc);
    });
  });
});

module.exports = logs;
