var express = require('express');
var router = express.Router();
var db = require('../sql.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	var info = req.query;
	console.log(info);
	db.query('delete from part_list where pno=? and sno=?',[info.pno,info.sno],(err,data)=>{
		if(err) throw err;
		db.query('select * from part_list where sno=?',[info.sno],(err,results)=>{
			if(err) throw err;
			res.render('tablelist',{tablelist: results,
									sno: info.sno})
		})
	})
});

router.get('/order', function(req, res, next) {
	var info = req.query;
	console.log(info);
	if(info.state=="已入库"){
		res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
		res.end('对象已入库,无法删除!');
	}
	else{
		db.query('delete from order_form where oid=? and sno=?',[info.oid,info.sno],(err,data)=>{
			if(err) throw err;
			db.query('select * from order_form where sno=?',[info.sno],(err,results)=>{
				if(err) throw err;
				db.query('select * from part_list where sno=?',[info.sno],(err,exist_p)=>{
					if(err) throw err;
					db.query('select * from warehouse',[],(err,exist_w)=>{
						if(err) throw err;
						res.render('order_s',{tablelist: results,
											  pnolist: exist_p,
											  wnolist: exist_w,
											  sno: info.sno});
					})
				})
			})
		})
	}
});

router.get('/project', function(req, res, next) {
	var info = req.query;
	console.log(info);
	db.query('delete from project where pid=? and sno=?',[info.pid,info.sno],(err,data)=>{
		if(err) throw err;
		db.query('select * from project where sno=?',[info.sno],(err,results)=>{
			if(err) throw err;
			res.render('project',{tablelist: results,
									sno: info.sno})
		})
	})
});


module.exports = router;
