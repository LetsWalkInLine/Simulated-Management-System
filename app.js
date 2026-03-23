var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var leftRouter = require('./routes/left');
var rightRouter = require('./routes/right');
var tablelist = require('./routes/tablelist');
var information = require('./routes/information');
var addPart = require('./routes/addPart');
var updatePart = require('./routes/updatePart');
var like = require('./routes/like');
var del = require('./routes/del');
var warehouse = require('./routes/warehouse');
var addWare = require('./routes/addWare');
var updateWare = require('./routes/updateWare');
var likeWare = require('./routes/likeWare');
var delWare = require('./routes/delWare');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', loginRouter);
//左侧
app.use('/left', leftRouter);
//右侧
app.use('/right', rightRouter)

app.use('/information', information);
//供应商
app.use('/tablelist', tablelist);
app.use('/addPart', addPart);
app.use('/updatePart', updatePart);
app.use('/like', like);
app.use('/del', del);
//仓库
app.use('/warehouse', warehouse);
app.use('/addWare', addWare);
app.use('/updateWare', updateWare);
app.use('/likeWare', likeWare);
app.use('/delWare', delWare);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
