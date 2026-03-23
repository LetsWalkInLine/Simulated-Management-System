var express = require('express');
var router = express.Router();
var db = require("../sql.js");

router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/main', function(req, res, next) {
	var info = req.body;
	//查询数据
	console.log(info);
	db.query("select * from login where userName=? and userPwd=? and status=?",[info.userName,info.userPwd,info.status],(err,results,fields)=>{
		if(err){
			throw err;
		}
		else if(results.length > 0){
			// todo,用于供应商第一次登录时注册个人信息
			res.render('main', {userName: info.userName,
								status: info.status});
		}
		else{
			res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
			res.end('账号或密码不正确!(或者该账户身份错误，没有登录权限!)');
		}
	})
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
	res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	var info = req.body;
	//查询数据
	db.query("select * from login where userName=?",[info.userName],(err,results,fields)=>{
		if(err){
			throw err;
		}
		else if(results.length > 0){
			res.end('该用户名已存在!');
		}
		else if(info.userPwd != info.repeatPwd){
			res.end("确认密码与之前密码不一致!");
		}
		else{
			db.query("insert into login values (?,?,?)",[info.userName,info.userPwd,info.status],(err,results,fields)=>{
				if(err) throw err;
				res.write("注册成功!");
				res.end();
			})
		}
	})
});

module.exports = router;