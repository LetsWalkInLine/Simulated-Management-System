var express = require('express');
var router = express.Router();
var db = require('../sql.js');

/* GET home page. */
router.get('/supplier', function(req, res, next) {
	var info = req.query;
	db.query('select * from supplier where userName=?',[info.userName],(err,results,fields)=>{
		if(err){
			throw err;
		}
		else if(results.length > 0){
			res.render('supplier', {infolist: results[0], 
									userName: info.userName});
		}
		else{
			res.render('modify_s', {userName: info.userName});
		}
	})
});

router.get('/modify_s', function(req, res, next) {
	var info = req.query;
	res.render('modify_s', {userName: info.userName});
});

router.post('/modify_s', function(req, res, next){
	res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	var info = req.body;
	console.log(info);
	db.query('select * from supplier where userName=?',[info.userName],(err,exist,fields)=>{
		if(err){
			throw err;
		}
		else if(exist.length > 0){
			db.query('select * from supplier where sno=? and userName<>?',[info.sno,info.userName],(err,results)=>{
				if(err){
					throw err;
				}
				else if(results.length > 0){
					res.end('该供应商号已存在!');
				}
				else{
					db.query('update supplier set sno=?,sname=?,address=?,phone=? where userName=?',
					[info.sno,info.sname,info.address,info.phone,info.userName],(err,data)=>{
						if(err) throw err;
						res.end('修改成功!')
					})
				}
			})
		}
		else{
			db.query('select * from supplier where sno=?',[info.sno],(err,results)=>{
				if(err){
					throw err;
				}
				else if(results.length > 0){
					res.end('该供应商号已存在!');
				}
				else{
					db.query('insert into supplier value(?,?,?,?,?)',
					[info.sno,info.sname,info.address,info.phone,info.userName],(err,data)=>{
						if(err) throw err;
						res.end('修改成功!');
					})
				}
			})
		}
	})
});

router.get('/wm', function(req, res, next) {
	var info = req.query;
	db.query('select * from wm where userName=?',[info.userName],(err,results,fields)=>{
		if(err){
			throw err;
		}
		else if(results.length > 0){
			res.render('wm', {infolist: results[0], 
							  userName: info.userName});
		}
		else{
			db.query('select * from warehouse',[],(err,data)=>{
				if(err) throw err;
				res.render('modify_w', {userName: info.userName,
										wnolist: data});
			})
		}
	})
});

router.get('/modify_w', function(req, res, next) {
	var info = req.query;
	db.query('select * from warehouse',[],(err,data)=>{
		if(err) throw err;
		res.render('modify_w', {userName: info.userName,
								wnolist: data});
	})
});

router.post('/modify_w', function(req, res, next){
	res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	var info = req.body;
	console.log(info);
	db.query('select * from wm where userName=?',[info.userName],(err,exist,fields)=>{
		if(err){
			throw err;
		}
		else if(exist.length > 0){
			db.query('select * from wm where wmno=? and userName<>?',[info.wmno,info.userName],(err,results)=>{
				if(err){
					throw err;
				}
				else if(results.length > 0){
					res.end('该职工号号已存在!');
				}
				else{
					db.query('update warehouse set noa=noa-1 where wno=?',[exist[0].wno],(err,data)=>{
						if(err) throw err;
					})
					db.query('update warehouse set noa=noa+1 where wno=?',[info.wno],(err,data)=>{
						if(err) throw err;
					})
					db.query('update wm set wmno=?,wname=?,profession=?,wno=? where userName=?',
					[info.wmno,info.wname,info.profession,info.wno,info.userName],(err,data)=>{
						if(err) throw err;
					})
					db.query('update wm set leader=?,wno=? where leader=?',
					[info.wmno,info.wno,exist[0].wmno],(err,data)=>{
						if(err) throw err;
					})
					res.end('修改成功!')
				}
			})
		}
		else{
			db.query('select * from wm where wmno=?',[info.wmno],(err,results)=>{
				if(err){
					throw err;
				}
				else if(results.length > 0){
					res.end('该职工号已存在!');
				}
				else{
					db.query('update warehouse set noa=noa+1 where wno=?',[info.wno],(err,data)=>{
						if(err) throw err;
					})
					db.query('insert into wm (wmno,wname,profession,leader,wno,userName) value(?,?,?,?,?,?)',
					[info.wmno,info.wname,info.profession,'无',info.wno,info.userName],(err,data)=>{
						if(err) throw err;
						res.end('修改成功!');
					})
				}
			})
		}
	})
});

router.get('/details', function(req, res, next) {
	var info = req.query;
	db.query('select * from part_list where pno=? and sno=?',[info.pno,info.sno],(err,results)=>{
		if(err) throw err;
		res.render('details', {infolist: results[0]});
	})
});

router.get('/warehouse', function(req, res, next) {
	var info = req.query;
	db.query('select * from wm where userName=?',[info.userName],(err,results,fields)=>{
		if(err){
			throw err;
		}
		else if(results.length > 0){
			db.query('select * from warehouse where wno=?',[results[0].wno],(err,data)=>{
				if(err) throw err;
				res.render('warehouse', {infolist: data[0]});
			})
		}
		else{
			db.query('select * from warehouse',[],(err,data)=>{
				if(err) throw err;
				res.render('modify_w', {userName: info.userName,
										wnolist: data});
			})
		}
	})
});

module.exports = router;
