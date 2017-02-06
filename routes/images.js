var express= require('express');
var router= express.Router();
var multer = require('multer');
var upload = multer({ dest: 'public/uploads/' });

/*router.get("/", function(req, res)
{
	res.send("Image Route");
});

router.get('/updateNavbarField', function(req, res) {
	res.sendfile("./public/javascripts/employee/search/navbar.html");  
});

router.post('/updateNavbarField', function(req, res) {
	var multiparty= require("multiparty");
	var form= new multiparty.Form();

	form.parse(req, function(err, fields, files)
	{ 

		var img= files.images[0];
		var fs= require("fs");

		fs.readFile(img.path, function(err, data)
		{
			var path= __dirname + "/public/uploads/"+img.originalFilename;
			console.log(path); 
			fs.writeFile(path, data, function( error )
			{
				if( error )console.log(error);
				res.send("Upload Success");
			})
		});
	}) 


});*/

module.exports= router;