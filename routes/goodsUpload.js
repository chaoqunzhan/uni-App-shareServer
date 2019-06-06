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
	let goodsImage = req.body.image;
	let goodupdate = new Date().toJSON().slice(0,10);
	// console.log(goodupdate);
	// console.log(goodsImage);
	// console.log(goodsUpload);

	// console.log('a.good.sort:',goodsUpload.sort);
	let goodslistInsert = new goodslist({
		'owner':goodsUpload.owner,
		'sort':goodsUpload.sort,
		'age':goodsUpload.age,
		'title':goodsUpload.title,
		'value':goodsUpload.value,
	    'phone':goodsUpload.phone,
	    'address':goodsUpload.address,
	    'describe':goodsUpload.describe,
	    'date':goodupdate,
    	'image':goodsImage
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





router.get("/getToken",function(req, res, next){

	//引入七牛依赖
	const qiniu = require("qiniu");
	//客户端调用接口，生成token
	let accessKey = 'lH8pcU3T2QqVRpFtKtLaSIKelEuUu268_FmTzvkA';
	let secretKey = 'kN-QQtR1hkS5X2ufnTPRmbHjqJntDPRMQ8VadWPg';
	let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
	let options = {
	  scope: 'uniappshare' //七牛资源目录
	};
	let putPolicy = new qiniu.rs.PutPolicy(options);
	let uploadToken = putPolicy.uploadToken(mac);
	console.log("uploadToken:"+uploadToken);
	//把uploadToken返回给客户端

	res.json({
		status:'0',
		msg:'',
		uploadToken:uploadToken
	});	

});

 
module.exports = router; 


