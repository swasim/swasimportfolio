var projectsJSON = require('../projects.json');
var db = require('../app.js')
var CONTACTS_COLLECTION = "contacts";

exports.homepage = function (req, res) {
    //var projects = projectsJSON.projects;
    res.render("homepage");
};
exports.resume = function (req, res) {
    res.render("resume");
};


exports.contactme = function(req, res){
	res.render('contactme');
	
};	
	
	





exports.myprojects = function (req, res) {
    res.render("myprojects");
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

    }};*/




exports.notFound = function(req, res) {
	res.render('notFound', {
		title : "Oops, this page doesn't exist"
	});
};