var express = require('express');
const query = require('express/lib/middleware/query');
var router = express.Router();
var db = require('../sql.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	var info = req.query;
	db.query('select * from wm where userName=?',[info.userName],function(err,wnolist){
		if(err) throw err;
		else if(wnolist.length > 0){
			// console.log(snolist[0].sno);
			db.query('select * from inventory where wno=?',[wnolist[0].wno],(err,results)=>{
				if(err) throw err;
				res.render('inventory',{tablelist: results,
										wno: wnolist[0].wno});
			})
		}
		else{
			res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
			res.end('请先在用户个人信息中完善个人信息!');
		}
	})
});

router.get('/order', function(req, res, next) {
	var info = req.query;
	db.query('select * from wm where userName=?',[info.userName],function(err,wnolist){
		if(err) throw err;
		else if(wnolist.length > 0){
			// console.log(snolist[0].sno);
			db.query('select * from order_form where wno=?',[wnolist[0].wno],(err,results)=>{
				if(err) throw err;
				res.render('order_w',{tablelist: results,
										wno: wnolist[0].wno});
			})
		}
		else{
			res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
			res.end('请先在用户个人信息中完善个人信息!');
		}
	})
});

router.get('/employee', function(req, res, next) {
	var info = req.query;
	db.query('select * from wm where userName=?',[info.userName],function(err,wnolist){
		if(err) throw err;
		else if(wnolist.length > 0){
			// console.log(snolist[0].sno);
			db.query('select * from wm where wno=?',[wnolist[0].wno],(err,results)=>{
				if(err) throw err;
				res.render('employee',{tablelist: results,
										wno: wnolist[0].wno,
										wmno: wnolist[0].wmno,
										listname: '当前仓库员工'});
			})
		}
		else{
			res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
			res.end('请先在用户个人信息中完善个人信息!');
		}
	})
});

router.post('/employee', function(req, res, next) {
	var info = req.body;
	console.log(info);
	if(info.selectVal == 'current'){
		// console.log(snolist[0].sno);
		db.query('select * from wm where wno=?',[info.wno],(err,results)=>{
			if(err) throw err;
			res.render('employee',{tablelist: results,
									wno: info.wno,
									wmno: info.wmno,
									listname: '当前仓库员工'});
		})
	}
	else if(info.selectVal == 'other'){
		db.query('select * from wm where wno=? and leader=?',[info.wno,'无'],(err,results)=>{
			if(err) throw err;
			res.render('employee',{tablelist: results,
									wno: info.wno,
									wmno: info.wmno,
									listname: '尚未分配领导员工'});
		})
	}
});

module.exports = router;