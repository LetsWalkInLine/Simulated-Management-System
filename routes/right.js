var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.query);
	res.render('right', {userName: req.query.userName});
});


module.exports = router;