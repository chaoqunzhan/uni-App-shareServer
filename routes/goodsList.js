/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-11-23 21:21:26
 * @version $Id$
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var goodslist = require('../models/goodsList');


mongoose.connect('mongodb://127.0.0.1:27017/uniAppShare',{ useNewUrlParser: true });

mongoose.connection.on("connected",function(){
	console.log("goodslist connected success.")
});

mongoose.connection.on("error",function(){
	console.log("goodslist connected fail.")
});

mongoose.connection.on("disconnected",function(){
	console.log("goodslist connected disconnected.")
});

router.get("/",function(req,res,next){
	console.log('hello api');
	let sortFlag = req.param("sortFlag");
	let params = {
		"sort":sortFlag,
	}

	let goodsListModel = goodslist.find({}).exec(function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message
			});	
		}else{
			res.json({
				status:'0',
				msg:'',
				result:{
					listcount:doc.length,
					list:doc
				}
			});
		}
	})

});



 
module.exports = router; 

