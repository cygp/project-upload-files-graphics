var fs = require('fs');
var formidable = require('formidable');
var fileName;

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/index.html', function(err, html) { 
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
}
exports.style = function(request, response) {
    console.log("Rozpoczynam obsługę żądania style.");
    fs.readFile('./style.css', function(err, css) { 
        response.writeHead(200, {"Content-Type": "text/css"});
        response.write(css);
        response.end();
    });
}

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
    	fileName = files.upload.name;
        fs.renameSync(files.upload.path, fileName);
    });
    fs.readFile('templates/upload.html', function(err, html) { 
	        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
	        response.write(html);
	        response.end();
    	});
}

exports.show = function(request, response) {
    fs.readFile(fileName, "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    });
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}