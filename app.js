'use strict';
var express = require('express');
var exphbs  = require('express-handlebars');
var _ = require('underscore');

var Converter = require("csvtojson").Converter;
var fs = require("fs");

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('assets'));
app.get('/', function (req, res) {

	var converter = new Converter({});
	var fileName = req.query.file;
	var title = req.query.title;
	var data = {};

	converter.on("end_parsed", function(tracks) {

		var tracksPerSleve = 25;
		var lists = _.groupBy(tracks, function(element, index) {
			return Math.floor(index/tracksPerSleve);
		});
		lists = _.toArray(lists);
		data = { lists: lists, title: title };
		console.log(data);
	});

	var stream = fs.createReadStream(fileName);
	stream.pipe(converter);
	stream.on('close', function() {
		console.log("close");
		res.render('home', data);
	});
});

app.listen(3000);
