var express = require('express');
const query = require('express/lib/middleware/query');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.query);
	if(req.query.status == 'supplier'){
		res.render('menu_s', {userName: req.query.userName});
	}
	if(req.query.status == 'wm'){
		res.render('menu_w', {userName: req.query.userName});
	}
});


module.exports = router;