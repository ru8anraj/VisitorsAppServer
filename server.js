const app = require('express')()
    , bodyParser = require('body-parser')
    , PORT = process.env.PORT || 8082;

const logs = require('./routes/logs.route.js');

app.use(function(req, res, next) {
 	res.header("Access-Control-Allow-Origin", "*");
 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 	next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/',(req,res,next)=>{
  console.log('inside routes');
  next();
}, logs);

app.listen(PORT, (err, res) => {
  if (err) {
    console.log('Error in starting the server - > ', err);
  } else {
    console.log('Server started in', PORT);
  }
});
