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
	db.query('update part_list set pname=?,unit_price=?,size=?,describes=? where pno=? and sno=?',
	[info.pname,info.unit_price,info.size,info.describe,info.pno,info.sno],(err,data)=>{
		if(err) throw err;
		else{
			db.query('select * from part_list where sno=?',[info.sno],(err,results)=>{
				if(err) throw err;
				res.render('tablelist',{tablelist: results,
										sno: info.sno});
			})
		}
	})
});

router.post('/order', function(req, res, next) {
	var info = req.body;
	console.log(info);
	if(info.state == '已入库'){
		res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
		res.end('对象已入库,无法再修改!');
	}
	else{
		db.query('select * from part_list where sno=?',[info.sno],(err,exist_p)=>{
			if(err) throw err;
			else if(exist_p.length > 0){
				db.query('select * from warehouse',[],(err,exist_w)=>{
					if(err) throw err;
					else if(exist_w.length > 0){
						db.query(`update order_form set pno=?,wno=?,quantity=? where oid=? and sno=?`,
						[info.pno,info.wno,Number(info.quantity),info.oid,info.sno],(err,data)=>{
							if(err) throw err;
							else{
								db.query('select * from order_form where sno=?',[info.sno],(err,results)=>{
									if(err) throw err;
									res.render('order_s',{tablelist: results,
														  pnolist: exist_p,
														  wnolist: exist_w,
														  sno: info.sno});
								})
							}
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
	}
});

router.post('/project', function(req, res, next) {
	var info = req.body;
	console.log(info);
	db.query('update project set budget=?,date=? where pid=? and sno=?',
	[info.budget,info.date,info.pid,info.sno],(err,data)=>{
		if(err) throw err;
		else{
			db.query('select * from project where sno=?',[info.sno],(err,results)=>{
				if(err) throw err;
				res.render('project',{tablelist: results,
										sno: info.sno});
			})
		}
	})
});


module.exports = router;
