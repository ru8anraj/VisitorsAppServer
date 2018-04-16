const app = require('express')()
    , PORT = process.env.PORT || 4141;

const logs = require('./routes/logs.route.js');

app.use(function(req, res, next) {
 	res.header("Access-Control-Allow-Origin", "*");
 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 	next();
});

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
