/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-12-12 18:46:31
 * @version $Id$
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var goodslist = require('../models/goodsList');
var qs = require('qs');

let db = mongoose.connect('mongodb://127.0.0.1:27017/uniAppShare',{ useNewUrlParser: true });

mongoose.connection.on("connected",function(){
	console.log("goodsUpload connected success.")
});

mongoose.connection.on("error",function(){
	console.log("goodsUpload connected fail.")
});

mongoose.connection.on("disconnected",function(){
	console.log("goodsUpload connected disconnected.")
});



router.post("/",function(req, res, next){
	let goodsUpload = JSON.parse(req.body.good);
	console.log(goodsUpload);

	console.log('a.good.sort:',goodsUpload.sort);
	let goodslistInsert = new goodslist({
		'sort':goodsUpload.sort,
		'age':goodsUpload.age,
		'title':goodsUpload.title,
		'value':goodsUpload.value,
	    'phone':goodsUpload.phone,
	    'address':goodsUpload.address,
	    'describe':goodsUpload.describe,
	    'date':"date",
    	'image':"image"
	    // "date":goodsUpload.date
	});

	goodslistInsert.save(function(doc,len,err){
		// db.close();
		if(err){
			res.json({
				status:'1',
				msg:'err'
			});
			console.log('failed')
		}else{
			res.json({
				status:'0',
				msg:'',
				result:'insert succeed'
			});
			console.log('goodslistInsert succeed')
		}
	})
});



 
module.exports = router; 


