var express = require('express');
var exphbs  = require('express-handlebars');

var Converter = require("csvtojson").Converter;
var fs = require("fs");
var converter = new Converter({});

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('assets'));
app.get('/', function (req, res) {

	var fileName = req.query.file;

	converter.on("end_parsed", function(jsonArray) {

		console.log(jsonArray);
		res.render('home', jsonArray);
	});

	fs.createReadStream(fileName).pipe(converter);
});

app.listen(3000);
