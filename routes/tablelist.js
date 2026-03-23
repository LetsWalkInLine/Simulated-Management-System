var express = require('express');
var router = express.Router();
var db = require('../sql.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	var info = req.query;
	db.query('select sno from supplier where userName=?',[info.userName],function(err,snolist){
		if(err){
			throw err;
		}
		else if(snolist.length > 0){
			// console.log(snolist[0].sno);
			db.query('select * from part_list where sno=?',[snolist[0].sno],(err,results)=>{
				if(err) throw err;
				res.render('tablelist',{tablelist: results,
										sno: snolist[0].sno});
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
	db.query('select sno from supplier where userName=?',[info.userName],function(err,snolist){
		if(err) throw err;
		else if(snolist.length > 0){
			// console.log(snolist[0].sno);
			db.query('select * from order_form where sno=?',[snolist[0].sno],(err,results)=>{
				if(err) throw err;
				db.query('select * from part_list where sno=?',[snolist[0].sno],(err,exist_p)=>{
					if(err) throw err;
					db.query('select * from warehouse',[],(err,exist_w)=>{
						if(err) throw err;
						res.render('order_s',{tablelist: results,
											  pnolist: exist_p,
											  wnolist: exist_w,
											  sno: snolist[0].sno});
					})
				})
			})
		}
		else{
			res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
			res.end('请先在用户个人信息中完善个人信息!');
		}
	})
});

router.get('/project', function(req, res, next) {
	var info = req.query;
	db.query('select sno from supplier where userName=?',[info.userName],function(err,snolist){
		if(err) throw err;
		else if(snolist.length > 0){
			// console.log(snolist[0].sno);
			db.query('select * from project where sno=?',[snolist[0].sno],(err,results)=>{
				if(err) throw err;
				res.render('project',{tablelist: results,
										sno: snolist[0].sno});
			})
		}
		else{
			res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
			res.end('请先在用户个人信息中完善个人信息!');
		}
	})
});

module.exports = router;