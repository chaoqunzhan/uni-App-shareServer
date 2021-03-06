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
var https = require('https');


mongoose.connect('mongodb://127.0.0.1:27017/uniAppShare',{ useNewUrlParser: true });
mongoose.connection.on("connected",function(){
	console.log("goodsUser connected success.")
});
mongoose.connection.on("error",function(){
	console.log("goodsUser connected fail.")
});
mongoose.connection.on("disconnected",function(){
	console.log("goodsUser connected disconnected.")
});

router.get("/",function(req,res,next){
	let code = req.param("code");
	console.log("code:"+code);	
	let url = "https://api.weixin.qq.com/sns/jscode2session?appid=wxa97a1c8b6b81586c&secret=c2338cbd0ace85016a9121c5d9ebbcd4&js_code="+code+"&grant_type=authorization_code";
	// let url = "http://192.168.1.154:3000/goodsList";
	var p = new Promise(function(resolve,reject){
		https.get(url, (res) => {
			console.log('状态码:', res.statusCode);
			console.log('请求头:', res.headers);
			res.on('data', (d) => {
				let b = JSON.parse(''+d);//将buffer转成JSON
				resolve(b);
			});
		}).on('error', (e) => {
		console.error(e);
		});
	})
	p.then((result)=>{
		console.log('openid:', result.openid);
		console.log('session_key:', result.session_key);
		res.json({
			status:'0',
			openid:result.openid
		});	
	})
});

// router.post("/users",function(req,res,next){



// });



 
module.exports = router; 