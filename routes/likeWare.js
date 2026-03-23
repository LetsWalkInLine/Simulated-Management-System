var express = require('express');
const query = require('express/lib/middleware/query');
var router = express.Router();
var db = require('../sql.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	info = req.query;
	console.log(info);
	info.like = '%' + info.like + '%';
	if(info.selectVal == 'pno'){
		db.query(`select * from inventory where wno=? and pno like ?`,[info.wno,info.like],(err,results)=>{
			if(err) throw err;
			res.render('inventory',{tablelist: results,
									wno: info.wno})
		})
	}
	else if(info.selectVal == 'sno'){
		db.query(`select * from inventory where wno=? and sno like ?`,[info.wno,info.like],(err,results)=>{
			if(err) throw err;
			res.render('inventory',{tablelist: results,
									wno: info.wno})
		})
	}
	else if(info.selectVal == 'quantity'){
		db.query(`select * from inventory where wno=? and quantity like ?`,[info.wno,info.like],(err,results)=>{
			if(err) throw err;
			res.render('inventory',{tablelist: results,
									wno: info.wno})
		})
	}
});

router.get('/order', function(req, res, next) {
	info = req.query;
	console.log(info);
	info.like = '%' + info.like + '%';
	if(info.selectVal == 'pno'){
		db.query(`select * from order_form where wno=? and pno like ?`,[info.wno,info.like],(err,results)=>{
			if(err) throw err;
			res.render('order_w',{tablelist: results,
									wno: info.wno})
		})
	}
	else if(info.selectVal == 'sno'){
		db.query(`select * from order_form where wno=? and sno like ?`,[info.wno,info.like],(err,results)=>{
			if(err) throw err;
			res.render('order_w',{tablelist: results,
									wno: info.wno})
		})
	}
	else if(info.selectVal == 'quantity'){
		db.query(`select * from order_form where wno=? and quantity like ?`,[info.wno,info.like],(err,results)=>{
			if(err) throw err;
			res.render('order_w',{tablelist: results,
									wno: info.wno})
		})
	}
	else if(info.selectVal == 'state'){
		db.query(`select * from order_form where wno=? and state like ?`,[info.wno,info.like],(err,results)=>{
			if(err) throw err;
			res.render('order_w',{tablelist: results,
									wno: info.wno})
		})
	}
});

module.exports = router;