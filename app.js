var express = require( 'express' );
var http = require( 'http' );
//var io = io.listen(app);
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var MongoClient = require('mongodb').MongoClient;

//var assert = require('assert');


var app = express();



//MongoDB setup
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(urlencodedParser); 

// locating files
var routes = require("./routes");


//server and engine 
const port = process.env.PORT;
process.env.NODE_ENV = 'production';
app.set( 'port', process.env.PORT || 8080);


//app.use(jsonParser());
//app.use(methodOverride());
app.set('views','./views');
app.set('view engine', 'ejs');

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


//routes
app.get('/', routes.homepage);
app.get('/resume', routes.resume);
app.get('/myprojects', routes.myprojects);
app.get('/myprojects/:projectNumber?', routes.myprojects);



//posting email to json file
//app.post('/contactSuccess', jsonParser, routes.contactSuccess);
app.get('/contact', routes.contactme);

//not found
app.get('*', routes.notFound);

/*
// Connection URL
var url = process.env.MONGOLAB_URI;


// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});*/

http.createServer( app ).listen( port,() => {
        console.log("We are live on "+ port); 
});

