var express = require('express');
var exphbs  = require('express-handlebars');

var Converter = require("csvtojson").Converter;
var fs = require("fs");
var converter = new Converter({});

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {

	converter.on("end_parsed", function(jsonArray) {
		res.render('home', jsonArray);
	});

	fs.createReadStream("./test.csv").pipe(converter);
});

app.listen(3000);
