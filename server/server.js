"use strict";

//loading packages
var express = require('express');
var app = express();
var fs = require( 'fs' );
var path = require( 'path' );
var search = require('../app/search.js');

const http = require('http');

/* allow access to folders */
app.use(express.static("../server"));
app.use(express.static("../app"));

// enable processing of received post content
app.use(bodyParser.urlencoded({
    extended: true
}));

function onRequest (req, res){
    res.writeHead(200, {'Content-Type':'text/html'}); //adjust content type
    fs.readFile('../app/index.html', null, function(error, data){
        if (error) {
            res.writeHead(404);
            res.write('File nor Found');
        } else {
            res.write(data);
        }
        res.end();
    });
}


// server configuration
var config = {
    port: 8000,
};

/* http routing. */
// log code executed on requests
app.use(function (req, res, next) {
    console.log(req.method + ' ' + req.url + ' was requested by ' + req.connection.remoteAddress);
    res.header('Access-Control-Allow-Origin', '*'); // allow CORS- requests
    next();
});


/*
 * #############################################################################
 * feature options #############################################################
 * #############################################################################
 */


/**
 * @desc AJAX.POST on server for sending a search request
 *       takes an array with search parameters via POST,
 *       and passes them to the search function
 *       url format: /search
 * @return metadata or error
 */
app.post('/search*', function (req, res) {
    var searchparams = req.body;
    feature.save(function (error) {
        var message = error ? 'failed to save feature: ' + error : 'feature saved: ' + feature.name;
        res.send(message);
    });
});


/**
 * @desc AJAX.GET to access search.
 *       find all searched items and sends them client
 *       url format: /find
 * @return searchdata or error
 */
app.get('/find', function (req, res) {
    search.searchname(function (error, searchresult) {
        if (error) return console.error(error)
        search.basicsearch() //welche Parameter werden übergeben??
        res.send(searchresult);
    });
});


http.createServer((request, response) = > {
    const {headers, method, url} = request;
let body = [];
request.on('error', (err) = > {
    console.error(err);
}).
on('data', (chunk) = > {
    body.push(chunk);
}).
on('end', () = > {
    body = Buffer.concat(body).toString();
// BEGINNING OF NEW STUFF

response.on('error', (err) = > {
    console.error(err);
})
;

response.statusCode = 200;
response.setHeader('Content-Type', 'application/json');
// Note: the 2 lines above could be replaced with this next one:
// response.writeHead(200, {'Content-Type': 'application/json'})

const responseBody = {headers, method, url, body};

response.write(JSON.stringify(responseBody));
response.end();
// Note: the 2 lines above could be replaced with this next one:
// response.end(JSON.stringify(responseBody))

// END OF NEW STUFF
})
;
}).
listen(8080);


//Funktionen die Anfragen händlen
//gdal info synchrone Abfragen
