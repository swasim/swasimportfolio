const express = require( 'express' );
const http = require( 'http' );
const bodyParser = require('body-parser');

const mongo = require("mongodb").MongoClient;
const dataURL = process.env.MONGOLAB_URI;


const app = express();
const port = process.env.PORT;


app.get('/', function (req, res) {
    
    res.writeHead(200, {'content-type':'application/JSON'});
    
    mongo.connect(dataURL, function(err, db) {
       if (err) throw err;
       
       var collection = db.collection('data');
       
       collection.insert({
           "key" :"test"
       }, function(err, data) {
          if (err) throw err;
          
          db.close();
          res.end(JSON.stringify(data["ops"][0]));
       });
    });
    
})

app.listen(port, function () {
  console.log('Example app listening on port!');
})













// http.createServer( app ).listen( port,() => {
//     console.log("We are live on "+ port);
//     console.log(process.env.MONGOLAB_URI);
// });

// locating files
// var routes = require("./routes");


//server and engine 
// const port = process.env.PORT;
// process.env.NODE_ENV = 'production';clearInterval()
// app.set( 'port', process.env.PORT || 8080);


// app.set('views','./views');
// app.set('view engine', 'ejs');

// var path = require('path');
// app.use(express.static(path.join(__dirname, 'public')));


//routes
// app.get('/', routes.homepage);
// app.get('/resume', routes.resume);
// app.get('/myprojects', routes.myprojects);
// app.get('/myprojects/:projectNumber?', routes.myprojects);



//posting email to json file
//app.post('/contactSuccess', jsonParser, routes.contactSuccess);
// app.get('/contact', routes.contactme);


/*function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}
app.post("/contact", function(req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();

  if (!(req.body.firstName || req.body.lastName)) {
    handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
  }

  db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.render("contactSuccess");
    }
  });
});*/



//not found
//app.get('*', routes.notFound);



// Connection URL
//var url = process.env.MONGOLAB_URI;


// Use connect method to connect to the server
/*MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});*/




// mongodb.MongoClient.connect(process.env.MONGODB_URI, 
// function (err, database) {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }

// db = database;
//   console.log("Database connection ready");
  
// http.createServer( app ).listen( port,() => {
//     console.log("We are live on "+ port); 
// });
  
  
// });

