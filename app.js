const express = require( 'express' );
const http = require( 'http' );
const bodyParser = require('body-parser');
const assert = require('assert');

const dataURL = process.env.MONGOLAB_URI;
const MongoClient =  require('mongodb').MongoClient;
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const jsonParser = bodyParser.json();

const port = process.env.PORT;
const app = express();

// locating files
var routes = require("./routes");

app.set('views','./views');
app.set('view engine', 'ejs');





var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


//routes
app.get('/', routes.homepage);
app.get('/resume', routes.resume);
app.get('/myprojects', routes.myprojects);
app.get('/myprojects/:projectNumber?', routes.myprojects);

app.get('/contact', routes.contactme);
app.post('/contact', urlencodedParser, routes.contactSuccess);

app.get('/contactSuccess',urlencodedParser, routes.contactSuccess);



//not found
app.get('*', routes.notFound);



app.listen(process.env.PORT, process.env.IP || '0.0.0.0' );

/*
MongoClient.connect(dataURL, (err, db) => {  
  if (err) {
    return console.log(err);
  }
    var emails = req.body;
    db.collection('emails', function(err, collection) {
    
    console.log('Adding emails: ' + JSON.stringify(emails));
        collection.insert(emails, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
});

*/