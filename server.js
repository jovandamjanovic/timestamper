var express = require("express");
var dateFormat = require('dateformat');

var app = express();
var router = express.Router();

router.use(function(req, res, next) {
    console.log('Request incoming.');
    console.log('Processing...');
    next();
});

router.route('/:date').get(function(req, res) {
   var outDate = {"unix": null, "natural": null};
   var inDate = Number.parseInt(req.params.date) ? (Number.parseInt(req.params.date)*1000) : req.params.date;
   inDate = new Date(inDate);
   if(!Number.isNaN(inDate.getDate())) {
       outDate.unix = Math.floor(inDate.getTime()/1000);
       outDate.natural = dateFormat(inDate, "mmmm d, yyyy");
    }
   res.json(outDate); 
});

app.use('/', router);

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});