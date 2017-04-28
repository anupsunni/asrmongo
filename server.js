const express = require('express');
const mnDb= require('mongodb').MongoClient;
const app= express();
const bp= require('body-parser');
app.use(bp.urlencoded({extended:true}));
var db;
app.set('view engine', 'ejs');
mnDb.connect('mongodb://localhost:27017/',function (err, db) {
    if (err) return console.log(err);
    this.db= db;
    app.listen(3000, function(){
        console.log('listening on 3000');

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

