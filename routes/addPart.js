var express = require('express');
var router = express.Router();
var db = require('../sql.js');

/* GET home page. */
router.post('/', function(req, res, next) {
	var info = req.body;
	console.log(info);
	if(info.describe == ''){
		info.describe = '无';
	}
	db.query('select * from part_list where pno=? and sno=?',[info.pno,info.sno],(err,exist)=>{
		if(err) throw err;
		else if(exist.length > 0){
			res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
			res.end('该零件已经存在!');
		}
		else{
			db.query('insert into part_list value(?,?,?,?,?,?)',
			[info.pno,info.pname,info.unit_price,info.size,info.describe,info.sno],(err,data)=>{
				if(err) throw err;
				db.query('select * from part_list where sno=?',[info.sno],(err,results)=>{
					if(err) throw err;
					res.render('tablelist',{tablelist: results,
											sno: info.sno});
				})
			})
		}
	})
});

router.post('/order', function(req, res, next) {
	var info = req.body;
	console.log(info);
	db.query('select * from part_list where sno=?',[info.sno],(err,exist_p)=>{
		if(err) throw err;
		else if(exist_p.length > 0){
			db.query('select * from warehouse',[],(err,exist_w)=>{
				if(err) throw err;
				else if(exist_w.length > 0){
					db.query('insert into order_form (sno,pno,wno,quantity,state) value(?,?,?,?,?)',
					[info.sno,info.pno,info.wno,Number(info.quantity),info.state],(err,data)=>{
						if(err) throw err;
						db.query('select * from order_form where sno=?',[info.sno],(err,results)=>{
							if(err) throw err;
							res.render('order_s',{tablelist: results,
												  pnolist: exist_p,
												  wnolist: exist_w,
												  sno: info.sno});
						})
					})	
				}
				else{
					res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
					res.end('没有仓库可以存储!');
				}
			})
		}
		else{
			res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
			res.end('没有零件可以供应!');
		}
	})
});

router.post('/project', function(req, res, next) {
	var info = req.body;
	console.log(info);
	var date = '北京时间 ' + info.year + '年' + info.month + '月' + info.day + '日';
	db.query('select * from project where pid=? and sno=?',[info.pid,info.sno],(err,exist)=>{
		if(err) throw err;
		else if(exist.length > 0){
			res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
			res.end('该项目已经存在!');
		}
		else{
			db.query('insert into project value(?,?,?,?)',
			[info.pid,info.budget,date,info.sno],(err,data)=>{
				if(err) throw err;
				db.query('select * from project where sno=?',[info.sno],(err,results)=>{
					if(err) throw err;
					res.render('project',{tablelist: results,
											sno: info.sno});
				})
			})
		}
	})
});


module.exports = router;
