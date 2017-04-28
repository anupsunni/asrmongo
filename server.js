const express = require('express');
const mnDb= require('mongodb').MongoClient;
const app= express();
const bp= require('body-parser');
var port = process.env.PORT || 3000;
app.use(bp.urlencoded({extended:true}));
var db;
app.set('view engine', 'ejs');
mnDb.connect('mongodb://<dbuser>:<dbpassword>@ds125481.mlab.com:25481/asrmongo',function (err, db) {
    if (err) return console.log(err);
    this.db= db;
    app.listen(port, function(){
        console.log('listening');

    });
});

app.get('/quotes', function(req, res){

    var cursor = this.db.collection('quotes').find().toArray(function(err,resl){
        console.log(resl);
        res.render('index.ejs', {quotes: resl});
	});


});

app.get('/', function (req, res) {
	res.sendFile(__dirname+'/index.html');
});

app.post('/quotes',function(req,res){
    this.db.collection('quotes').save(req.body,function (err, result) {
		if(err) return console.log(err);
		console.log('saved');
		res.redirect('/quotes');
    })
});

