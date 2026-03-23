var express = require('express');
const query = require('express/lib/middleware/query');
var router = express.Router();
var db = require('../sql.js');

/* GET home page. */
router.get('/hire', function(req, res, next) {
	var info = req.query;
	console.log(info);
	if(info.id == info.wmno){
		res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
		res.end('不能更改自身从属关系!');
	}
	else if(info.leader != '无'){
		res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
		res.end('该职工已拥有从属关系!');
	}
	else{
		db.query('select * from wm where leader=?',[info.id],(err,exist)=>{
			if(err) throw err;
			else if(exist.length > 0){								//有领导权限
				db.query('update wm set leader=?,wno=? where wmno=?',[info.id,exist[0].wno,info.wmno],(err,data)=>{
					if(err) throw err;
					db.query('select * from wm where wno=?',[exist[0].wno],(err,results)=>{
						if(err) throw err;
						res.render('employee',{tablelist: results,
												wno: exist[0].wno,
												wmno: info.id,
												listname: '当前仓库员工'});
					})
				})
			}
			else{
				res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
				res.end('没有修改权限!');
			}
		})
	}
});

router.get('/fire', function(req, res, next) {
	var info = req.query;
	console.log(info);
	if(info.id == info.wmno){
		res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
		res.end('不能更改自身从属关系!');
	}
	else if(info.leader == '无'){
		res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
		res.end('该职工尚未拥有从属关系!');
	}
	else{
		db.query('select * from wm where leader=?',[info.id],(err,exist)=>{
			if(err) throw err;
			else if(exist.length > 0){								//有领导权限
				db.query('update wm set leader=? where wmno=?',['无',info.wmno],(err,data)=>{
					if(err) throw err;
					db.query('select * from wm where wno=?',[exist[0].wno],(err,results)=>{
						if(err) throw err;
						res.render('employee',{tablelist: results,
												wno: exist[0].wno,
												wmno: info.id,
												listname: '当前仓库员工'});
					})
				})
			}
			else{
				res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
				res.end('没有修改权限!');
			}
		})
	}
});


module.exports = router;