//Copyright 2022 Gilgamech Technologies
//Title: Basic Webserver
//Made by: Stephen Gillie
//Created on: 6/17/2022
//Updated on: 6/28/2022
//Notes: 

const http = require("http");
const fs = require('fs');
var url  = require('url');
var serverPort = 80;

var responseData = "Hola Mundo";
var fourOhFour = "Hola Mundo";
var pagename = "index.html";
var statusCode = 200;
const files = fs.readdirSync("/home/app");

fs.readFile("/home/app/custerr/404.htm", 'utf8', function (err,data) {
	fourOhFour =  data;
	if (err) {
		"404 not found - "+err;
		console.log(err);
	}
});


const server = http.createServer((request, response) => {
	statusCode = 200;
	console.log("Request from "+request.socket.remoteAddress+" for page "+request.url);
	if (request.url=='/'){
		pagename = "/index.html";
	} else {
		pagename = request.url;
	};

	var contentType = 'text/plain';
	var encodingType = '';
	switch(pagename.split(".")[1]) {
	  case "css":
		contentType = 'text/css'
		break;
	  case "gif":
		contentType = 'image/gif'
		break;
	  case "htm":
		contentType = 'text/html'
		break;
	  case "html":
		contentType = 'text/html'
		break;
	  case "ico":
		contentType = 'image/x-icon'
		break;
	  case "jpg":
		contentType = 'image/jpeg'
		break;
	  case "js":
		contentType = 'application/javascript'
		break;
	  case "pdf":
		contentType = 'application/pdf'
		break;
	  case "png":
		contentType = 'image/png'
		break;
	  case "scad":
		break;
	  case "txt":
		break;
	  case "png":
		contentType = 'image/png'
		break;
	  default:
	}//end switch pagename

	switch(request.url) {
	  default:
		  if (files.includes(pagename.split("/")[1])) {
			fs.readFile("/home/app"+pagename, function (err,data) {
				statusCode = 200;
				responseData =  data;
				if (err) {
					statusCode = 404;
					responseData =  fourOhFour;
					console.log(err);
				} 
				response.writeHead(statusCode, {'Content-Type': contentType}); 
				response.end(responseData);
			});
		} else {
			responseData =  fourOhFour;
			console.log("404 error: "+pagename+" not found.");

			response.writeHead(404, {'Content-Type': 'text/html'}); 
			response.end(responseData);
		}
		break;
	} // end switch pagename
})
  
server.listen((serverPort), () => {
    console.log("Server is Running on port "+serverPort);
})