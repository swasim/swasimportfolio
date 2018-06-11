require('dotenv').config()

const express = require('express');
const http = require('http');
const apiRouter = require('./api');

const bodyParser = require('body-parser');
const assert = require('assert');

//
const minifyHTML = require('express-minify-html')
const ENV = process.env.NODE_ENV || 'development'
const PORT = process.env.PORT || 3000

const dataURL = process.env.MONGOLAB_URI;
const MongoClient = require('mongodb').MongoClient;
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

const port = process.env.PORT;
const app = express();

// locating files
const routes = require("./routes");

app.set('views', './views');
app.set('view engine', 'ejs');

//app.use('/api', apiRouter);
const path = require('path');
app.use(express.static(path.join('public')));



//routes
app.get('/', routes.homepage);
app.get('saherwasim.com/introduction', routes.introduction);
app.get('/myworld', routes.myworld);
app.get('/resume', routes.resume);
app.get('/myblog', routes.myBlog);
app.get('/myprojects', routes.myprojects);
app.get('/myprojects/:projectNumber?', routes.myprojects);

app.get('/projectDNA', routes.projectDNA);
app.get('/projectDesign', routes.projectDesign);

app.get('/contact', routes.contactme);
app.post('/contact', urlencodedParser, routes.contactSuccess);
app.get('/contactSuccess', urlencodedParser, routes.contactSuccess);

//not found
app.get('*', routes.notFound);

// For production (Heroku) http:// requests, redirect to https://
// if (app.get('env') === 'production') {
//     app.get((req, res, next) => {
//         if (req.header('X-Forwarded-Proto') !== 'https') {
//             res.redirect(`https://${req.header('host').replace(/^www\./, '')}${req.url}`)
//         }
//         else {
//             next()
//         }
//     })
// }

const forceSSL = function() {
    return function(req, res, next) {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(
                ['https://', req.get('Host'), req.url].join('')
            );
        }
        next();
    }
};
app.use(forceSSL());
// app.listen(process.env.PORT, process.env.IP || '0.0.0.0');

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`)
})




// 'use strict'

// // Server
// require('dotenv').config()
// const express = require('express')
// const app = express()

// // Environment
// const ENV = process.env.NODE_ENV || 'development'
// const PORT = process.env.PORT || 3000
// const SW_TRACKING_ID = process.env.SW_TRACKING_ID
// const KEY_1 = process.env.COOKIE_SESSION_KEY_1
// const KEY_2 = process.env.COOKIE_SESSION_KEY_2
// const dataURL = process.env.MONGOLAB_URI;
// // Database
// const db = require('./db')
// const knexConfig = require('./knexfile')
// db.init(app, knexConfig[ENV])
// const knex = db.handle()

// // Packages
// const bodyParser = require('body-parser')
// const compression = require('compression')
// const cookieSession = require('cookie-session')
// const helmet = require('helmet')
// const minifyHTML = require('express-minify-html')
// const sass = require('node-sass-middleware')

// // Routes
// const adminRoutes = require('./routes/admin')
// const blogRoutes = require('./routes/blog')
// const contactRoutes = require('./routes/contact')
// const resumeRoutes = require('./routes/resume')
// const signatureAPIRoutes = require('./routes/signature-api')

// app.set('view engine', 'ejs')
// app.use(helmet())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cookieSession({
//     name: 'session',
//     keys: [KEY_1, KEY_2]
// }))
// app.use(express.static('public'))
// app.use((req, res, next) => {
//     res.locals.userId = req.session.userId
//     res.locals.googleAnalyticsId = GA_TRACKING_ID
//     next()
// })
// app.use('/styles', sass({
//     src: __dirname + '/styles',
//     dest: __dirname + '/public/styles',
//     debug: true,
//     outputStyle: 'compressed'
// }))
// app.use(compression())
app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
    }
}))

// // Imported routes from ./routes directory
// app.use('/admin', adminRoutes)
// //app.use('/blog', blogRoutes)
// //app.use('/contact', contactRoutes)
// app.use('/resume', resumeRoutes)
// app.use('/signature-api', signatureAPIRoutes)

// // //routes
// // app.get('/', routes.homepage);
// // app.get('/introduction', routes.introduction);
// // app.get('/myworld', routes.myworld);
// // app.get('/resume', routes.resume);
// // app.get('/myblog', routes.myBlog);
// // app.get('/myprojects', routes.myprojects);
// // app.get('/myprojects/:projectNumber?', routes.myprojects);

// // app.get('/projectDNA', routes.projectDNA);
// // app.get('/projectDesign', routes.projectDesign);

// // app.get('/contact', routes.contactme);
// // app.post('/contact', urlencodedParser, routes.contactSuccess);
// // app.get('/contactSuccess',urlencodedParser, routes.contactSuccess);

// // For production (Heroku) http:// requests, redirect to https://
// if (app.get('env') === 'production') {
//     app.use((req, res, next) => {
//         if (req.header('X-Forwarded-Proto') !== 'https') {
//             res.redirect(`https://${req.header('host').replace(/^www\./, '')}${req.url}`)
//         }
//         else {
//             next()
//         }
//     })
// }

// // GET route to index
// app.get('/', (req, res) => {
//     knex('projects')
//         .select(['*'])
//         .orderBy('display_order', 'desc')
//         .then((results) => {
//             let templateVars = {
//                 projects: results
//             }
//             res.render('index', templateVars)
//         })
//         .catch((error) => {
//             console.log(error)
//             res.render('index')
//         })
// })

// // GET catch-all route to 404
// app.get('*', (req, res) => {
//     res.status(404).render('404')
// })

// // Persistent Listener
// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}.`)
// })
