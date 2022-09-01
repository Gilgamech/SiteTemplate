//Copyright 2022 Gilgamech Technologies
//Title: Basic Webserver
//Made by: Stephen Gillie
//Created on: 6/17/2022
//Updated on: 7/5/2022
//Notes: 


const express = require('express')
const app = express()
const fs = require('fs');
const url  = require('url');
const port = 80;

const homeDir = "/home/app";
// const homeDir = "/repos/SiteTemplate";
// Listing of files, to more safely check inputs.
const files = fs.readdirSync(homeDir);

app.get('/', (request, response) => {
	console.log(request.method+" request from "+request.socket.remoteAddress+" for page "+pagename);
	var pagename = "/index.html";
	fs.readFile(homeDir+pagename, function (err,data) {
			response.end(data);
	})
})

  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

