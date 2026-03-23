var express = require('express');
var router = express.Router();
var db = require('../sql.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	info = req.query;
	console.log(info);
	info.like = '%' + info.like + '%';
	if(info.selectVal == 'pno'){
		db.query(`select * from part_list where sno=? and pno like ?`,[info.sno,info.like],(err,results)=>{
			if(err) throw err;
			res.render('tablelist',{tablelist: results,
									sno: info.sno})
		})
	}
	else if(info.selectVal == 'pname'){
		db.query(`select * from part_list where sno=? and pname like ?`,[info.sno,info.like],(err,results)=>{
			if(err) throw err;
			res.render('tablelist',{tablelist: results,
									sno: info.sno})
		})
	}
	else if(info.selectVal == 'unit_price'){
		db.query(`select * from part_list where sno=? and unit_price like ?`,[info.sno,info.like],(err,results)=>{
			if(err) throw err;
			res.render('tablelist',{tablelist: results,
									sno: info.sno})
		})
	}
	else if(info.selectVal == 'size'){
		db.query(`select * from part_list where sno=? and size like ?`,[info.sno,info.like],(err,results)=>{
			if(err) throw err;
			res.render('tablelist',{tablelist: results,
									sno: info.sno})
		})
	}
	else{
		db.query(`select * from part_list where sno=? and describes like ?`,[info.sno,info.like],(err,results)=>{
			if(err) throw err;
			res.render('tablelist',{tablelist: results,
									sno: info.sno})
		})
	}
});

router.get('/order', function(req, res, next) {
	info = req.query;
	console.log(info);
	info.like = '%' + info.like + '%';
	if(info.selectVal == 'pno'){
		db.query(`select * from order_form where sno=? and pno like ?`,[info.sno,info.like],(err,results)=>{
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
	}
	else if(info.selectVal == 'wno'){
		db.query(`select * from order_form where sno=? and wno like ?`,[info.sno,info.like],(err,results)=>{
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
	}
	else if(info.selectVal == 'quantity'){
		db.query(`select * from order_form where sno=? and quantity like ?`,[info.sno,info.like],(err,results)=>{
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
	}
	else if(info.selectVal == 'state'){
		db.query(`select * from order_form where sno=? and state like ?`,[info.sno,info.like],(err,results)=>{
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
	}
});

router.get('/project', function(req, res, next) {
	info = req.query;
	console.log(info);
	if(info.selectVal == 'pid'){
		info.like = '%' + info.like + '%';
		db.query(`select * from project where sno=? and pid like ?`,[info.sno,info.like],(err,results)=>{
			if(err) throw err;
			res.render('project',{tablelist: results,
									sno: info.sno})
		})
	}
	else if(info.selectVal == 'budget'){
		info.like = '%' + info.like + '%';
		db.query(`select * from project where sno=? and budget like ?`,[info.sno,info.like],(err,results)=>{
			if(err) throw err;
			res.render('project',{tablelist: results,
									sno: info.sno})
		})
	}
	else if(info.selectVal == 'year'){
		info.like = '% ' + info.like + '年%';
		db.query(`select * from project where sno=? and date like ?`,[info.sno,info.like],(err,results)=>{
			if(err) throw err;
			res.render('project',{tablelist: results,
									sno: info.sno})
		})
	}
	else if(info.selectVal == 'month'){
		info.like = '%年' + info.like + '月%';
		db.query(`select * from project where sno=? and date like ?`,[info.sno,info.like],(err,results)=>{
			if(err) throw err;
			res.render('project',{tablelist: results,
									sno: info.sno})
		})
	}
	else if(info.selectVal == 'day'){
		info.like = '%月' + info.like + '日%';
		db.query(`select * from project where sno=? and date like ?`,[info.sno,info.like],(err,results)=>{
			if(err) throw err;
			res.render('project',{tablelist: results,
									sno: info.sno})
		})
	}
});


module.exports = router;
