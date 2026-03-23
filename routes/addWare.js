var express = require('express');
const query = require('express/lib/middleware/query');
var router = express.Router();
var db = require('../sql.js');

/* GET home page. */
router.post('/', function(req, res, next) {
	var info = req.body;
	console.log(info);
	db.query('select * from warehouse where wno=?',[info.wno],(err,exist)=>{
		if(err) throw err;
		else if(exist.length > 0){
			res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
			res.end('该仓库已经存在!');
		}
		else{
			db.query('insert into warehouse (wno,square,phone) value(?,?,?)',
			[info.wno,info.square,info.phone],(err,data)=>{
				if(err) throw err;
				res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
				res.end('添加仓库成功!');
			})
		}
	})
});

router.get('/order', function(req, res, next) {
	var info = req.query;
	console.log(info);
	if(info.state=="已入库"){
		res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
		res.end('请勿重复入库!');
	}
	else{
		db.query('update order_form set state=? where oid=?',['已入库',info.oid],(err,data)=>{
			if(err) throw err;
		})
		db.query('select * from inventory where wno=? and pno=? and sno=?',[info.wno,info.pno,info.sno],(err,exist)=>{
			if(err) throw err;
			else if(exist.length > 0){
				db.query('update inventory set quantity=quantity+? where wno=? and pno=? and sno=?',
				[Number(info.quantity),info.wno,info.pno,info.sno],(err,data)=>{
					if(err) throw err;
				})
			}
			else{
				db.query('insert into inventory value(?,?,?,?)',
				[info.pno,info.sno,Number(info.quantity),info.wno],(err,data)=>{
					if(err) throw err;
				})
			}
			db.query('select * from order_form where wno=?',[info.wno],(err,results)=>{
				if(err) throw err;
				res.render('order_w',{tablelist: results,
									  wno: info.wno});
			})
		})
	}
});

module.exports = router;