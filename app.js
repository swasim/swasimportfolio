const express = require( 'express' );
const http = require( 'http' );
const apiRouter= require('./api');

const bodyParser = require('body-parser');
const assert = require('assert');

const dataURL = process.env.MONGOLAB_URI;
const MongoClient =  require('mongodb').MongoClient;
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const jsonParser = bodyParser.json();

const port = process.env.PORT;
const app = express();

// locating files
const routes = require("./routes");

app.set('views','./views');
app.set('view engine', 'ejs');

//app.use('/api', apiRouter);
const path = require('path');
app.use(express.static(path.join('public')));



//routes
app.get('/', routes.homepage);
app.get('/introduction', routes.introduction);
app.get('/myworld', routes.myworld);
app.get('/resume', routes.resume);
app.get('/myblog', routes.myBlog);
app.get('/myprojects', routes.myprojects);
app.get('/myprojects/:projectNumber?', routes.myprojects);

app.get('/projectDNA', routes.projectDNA);
app.get('/projectDesign', routes.projectDesign);

app.get('/contact', routes.contactme);
app.post('/contact', urlencodedParser, routes.contactSuccess);
app.get('/contactSuccess',urlencodedParser, routes.contactSuccess);

//not found
app.get('*', routes.notFound);

app.listen(process.env.PORT, process.env.IP || '0.0.0.0' );



