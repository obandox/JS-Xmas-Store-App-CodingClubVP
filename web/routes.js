// packages
var express = require('express');
var web = express();
var svr = require('http').createServer(web);
var sio = require('socket.io')(svr);
var generator = require('../helpers/generator');
var pages = require('../config.json').pages;
var resources = require('../config.json').resources;
var inspector = require('../helpers/inspector');
var middleware = require('../helpers/middleware');



//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Location, X-Timezone');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');

    // intercept OPTIONS method
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
};


// settings
var views = inspector.addPluginsWeb(web);
views.push(__dirname.replace('/web', '/views'));
web.set('views', views);
web.set('view engine', 'jade');
web.use(allowCrossDomain);
web.use(express.static(__dirname.replace('/web', '/public')));
// web.use(middleware.trusted);
web.use(middleware.robots);
web.use(middleware.browser);

// resources
for(var route in resources){
  if(resources.hasOwnProperty(route)){
    generator.addView(web, route);
  }
}

// additions
for(var p in pages){
  if(resources.hasOwnProperty(route)){
    var page = pages[p];
    generator.addPage(web, page);
  }
}

// main
web.get('/', function(req, res){
  res.render('index/index', {
    model: false,
    site: require('../config.json').site,
    theme: require('../config.json').theme
  });
});

//console.log(web._router.stack);

module.exports.web = web;
module.exports.svr = svr;
module.exports.sio = sio;
