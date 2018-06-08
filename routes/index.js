const express = require( 'express' );
const bodyParser = require('body-parser');
const assert = require('assert');
const mongodb = require('mongodb');
const MongoClient =  require('mongodb').MongoClient;
const dataURL = process.env.MONGOLAB_URI; 
const app = express();
// const homepage = require('./homepage.js');
// const resume = require('./resume.js');

//MongoDB setup
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json());

exports.homepage = function (req, res) {
    //var projects = projectsJSON.projects;
   
    return res.render("homepage");
};


exports.resume = function (req, res) {
    return res.render("resume");
};

exports.introduction = function (req, res) {
    return res.render("introduction");
};

exports.myworld = function (req, res) {
    return res.render("myworld");
};

exports.myBlog = function (req, res) {
    return res.render("myBlog");
};

exports.contactme = function(req, res, next){
	res.render('contactme');
};


exports.contactSuccess = function (req, res, next) {
    var email = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    }
    MongoClient.connect(dataURL, function(err, dataURL){
        console.log("Connected");
        assert.equal(null, err);
        dataURL.collection('emails').insertOne(email, function(err, result){
            assert.equal(null, err);
            console.log('Email inserted');
            if (err)
                res.send('Error');
            else
                res.render('contactSuccess');

        });

    });
}



exports.myprojects = function (req, res) {
    res.render("myprojects");
};

exports.projectDNA = function (req, res) {
    res.render("projectDNA");
};

exports.projectDesign = function (req, res) {
    res.render("projectDesign");
};

/*
exports.myprojects = function(req, res) {
    var projects = projectsJSON.projects;
   
    
    for(var i = 1; i <= projects.length; i++){
        var projectNumber = projects.projectNumber;
        
        projectNumber = req.params.projectNumber;
        projectNumber = i + 1;
    
    
    
	if (projectNumber >= 1 && projectNumber <= 2) {

		var project = projects[i - 1];

		var title = project.title;

		var year = project.year;
		var link = project.link;
        
        
		
		res.render('myprojects', {
			projects : projects,
			project : project,
			title : title,
			year : year,
			link : link
		});

	} else {
		res.render('notFound', {
			projects : projects,
			title : "Oops, this page doesn't exist"
		});
	}

    }};
var projectsJSON = require('../projects.json');    
    */




exports.notFound = function(req, res) {
	res.render('notFound', {
		title : "Oops, this page doesn't exist"
	});
};