var express = require('express');
const query = require('express/lib/middleware/query');
var router = express.Router();
var db = require('../sql.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	var info = req.query;
	console.log(info);
	db.query('delete from inventory where pno=? and sno=? and wno=?',[info.pno,info.sno,info.wno],(err,data)=>{
		if(err) throw err;
		db.query('select * from inventory where sno=?',[info.wno],(err,results)=>{
			if(err) throw err;
			res.render('inventory',{tablelist: results,
									wno: info.wno})
		})
	})
});


module.exports = router;