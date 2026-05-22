# 仓库供应链管理系统

## B/S架构下基于Node.js+mysql+express的RBAC仓库管理系统

### 目录
[TOC]
## 预备实验
### 建立数据库的基本表

```sql
CREATE TABLE `order_form` (
  `oid` int NOT NULL AUTO_INCREMENT,
  `sno` varchar(45) NOT NULL,
  `pno` varchar(45) NOT NULL,
  `wno` varchar(45) NOT NULL,
  `quantity` int NOT NULL,
  `state` varchar(20) NOT NULL,
  PRIMARY KEY (`oid`),
  KEY `os_idx` (`sno`),
  KEY `ow_idx` (`wno`),
  CONSTRAINT `os` FOREIGN KEY (`sno`) REFERENCES `supplier` (`sno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ow` FOREIGN KEY (`wno`) REFERENCES `warehouse` (`wno`) ON DELETE CASCADE ON UPDATE CASCADE
)
```

### 增删改表中数据
```sql
增加：
'insert into order_form (sno,pno,wno,quantity,state) value(?,?,?,?,?)',
[info.sno,info.pno,info.wno,Number(info.quantity),info.state]

删除：
'delete from order_form where oid=? and sno=?',[info.oid,info.sno]

修改：
'update part_list set pname=?,unit_price=?,size=?,describes=? where pno=? and sno=?',
	[info.pname,info.unit_price,info.size,info.describe,info.pno,info.sno]
```
### 查询表中数据
```bash
按照零件号检索：
`select * from order_form where sno=? and pno like ?`,[info.sno,info.like]

按照仓库号检索：
`select * from order_form where sno=? and wno like ?`,[info.sno,info.like]

按照供应量检索：
`select * from order_form where sno=? and quantity like ?`,[info.sno,info.like]

按照出入库状态检索：
`select * from order_form where sno=? and state like ?`,[info.sno,info.like]
```

## 综合实验：仓库管理系统
### 一. 实验环境

- 数据库：MySQL
- 后端+前端：Node.js+Express框架  (HTML+CSS+Javascript(jQuery,Bootstrap))

### 二. 项目架构
#### 1.文件架构

| bin                |            运行服务器入口文件             |
| ------------------ | :---------------------------------------: |
| node_modules       | 外部依赖包文件，安装jQuery,mysql,nodejs等 |
| public/images      |               文件依赖图片                |
| public/javascripts |         前端页面所依赖的js文件包          |
| public/stylesheets |         前端页面所依赖的css文件包         |
| routes             |              页面路由文件包               |
| views              |              前端页面文件包               |
| app.js             |               路由设置文件                |
| mysql.js           |              数据库连接文件               |
|                    |                                           |

```bash
|-------bin
|		 |--www	
|
|-------node_modules
|
|-------public
|		 |--images
|  		 |--javascripts
|			|---changepic.js
|			|---jquery.js
|			|---l2r.js
|			|---r2l.js
|		 |--stylesheets
|			|---bootstrap
|			|---bootstrap.min.css
|			|---left_style.css
|			|---right_style.css
|			|---style.css
|			|---style_r.css
|			|---table_style.css
|
|-------routes
|		 |--addPart.js
|		 |--addWare.js
|		 |--del.js
|		 |--delWare.js
|		 |--index.js
|		 |--information.js
|		 |--left.js
|		 |--like.js
|		 |--likeWare.js
|		 |--login.js
|		 |--right.js
|		 |--tablelist.js
|		 |--updatePart.js
|		 |--updateWare.js
|		 |--warehouse.js
|
|-------views
|		 |--details.ejs
|		 |--employee.ejs
|		 |--error.ejs
|		 |--index.ejs
|		 |--inventory.ejs
|		 |--login.ejs
|		 |--main.ejs
|		 |--menu_s.ejs
|		 |--menu_w.ejs
|		 |--modify_s.ejs
|		 |--modify_w.ejs
|		 |--order_s.ejs
|		 |--order_w.ejs
|		 |--project.ejs
|		 |--register.ejs
|		 |--right.ejs
|		 |--supplier.ejs
|		 |--tablelist.ejs
|		 |--test.html
|		 |--warehouse.ejs
|		 |--wm.ejs
|
|-------app.js
|
|-------sql.js
|
|-------package.json
|
|-------package-lock.json
|
|-------README.md
```

#### 2.运行方式

1. 将打包文件中的`warehouse_db.sql`导入数据库从而构建数据库
2. 进入www文件的存放位置`dbms/bin/www`

3. 在命令行界面，输入`node www` 开启服务器，`ctrl+c`即可关闭服务器![1](C:\Users\Administrator\Desktop\dbexp\1.png)

4. 打开浏览器，输入http://localhost:3000/admin进入搭建的网站。

### 三. 实验目的

实现基于RBAC（基于角色访问控制）的B/S架构的仓库管理系统

1. 供应商端：
   1. 实现零件信息的添加，删除，修改，模糊匹配查找
   2. 实现供应订单的添加，删除，修改，模糊匹配查找
   3. 实现项目信息的添加，删除，修改，模糊匹配查找
   4. 实现用户个人信息的修改，查看
2. 仓库高级管理员端：
   1. 实现零件库存的添加，查找以及出库操作
   2. 实现供应订单对应零件的入库，查找以及详细信息操作
   3. 实现职工信息的管理，删除，修改，查找目标职工
   4. 实现对所属仓库信息的查看，能够完成新建仓库的操作
   5. 实现用户个人信息的修改，查看
3. 仓库普通管理员端：
   1. 实现零件库存的添加，查找以及出库操作
   2. 实现供应订单对应零件的入库，查找以及详细信息操作
   3. 实现对所属仓库信息的查看
   4. 实现用户个人信息的修改，查看

### 四. 系统设计

#### 1.需求分析

##### 系统目标

- **核心目标**：实现一个高效、安全的仓库供应量管理系统，确保原料供应的顺畅、库存管理的精确以及人员权限的严格控制。
- **用户满意度**：提升供应商、仓库管理员及高级管理员的工作效率，减少人为错误，提高数据透明度。

##### 用户角色与权限

- 供应商
  - 权限：提交原料供应信息（包括数量、种类、预期到货时间等）、查询供应订单状态、接收供应确认通知。
  - 禁止：访问仓库库存信息、修改其他供应商的数据、管理仓库管理员账户。
- 仓库普通管理员
  - 权限：管理仓库的日常入库操作（包括接收原料、记录入库信息）、出库操作（发货、记录出库信息）、查询自己管理的库存信息、生成库存报告。
  - 禁止：管理其他仓库的库存、修改仓库高级管理员的权限、访问或修改供应商信息。
- 仓库高级管理员
  - 权限：包含普通管理员的所有权限，并增加管理普通管理员账户（包括创建、修改、删除账户及权限分配）、审核库存报告、查看所有仓库的库存信息、进行全局性的库存调配。
  - 禁止：直接修改供应商信息（但可审核供应商提交的供应信息）。

##### 系统功能需求

- 用户管理
  - 支持用户注册、登录、密码重置。
  - 支持高级管理员管理普通管理员账户（增删改查及权限分配）。
- 供应管理
  - 供应商能够提交供应请求，并查看请求状态。
  - 系统自动或手动审核供应请求，并通知供应商。
- 库存管理
  - 支持原料的入库登记，包括数量、种类、批次号、供应商信息等。
  - 支持原料的出库登记，记录出库时间、数量、去向等。
  - 提供库存查询功能，按种类、批次、时间等条件筛选。
  - 库存预警功能，当库存低于安全库存时自动提醒。
- 权限控制
  - 实现基于角色的权限控制，确保各角色只能访问其权限范围内的数据。
  - 记录所有用户的操作日志，便于审计和追踪。

##### 安全与合规

- 确保系统数据的安全性，采用加密技术保护敏感信息。
- 遵守相关法律法规，如GDPR（欧盟通用数据保护条例）等。
- 定期进行安全审计和漏洞扫描，确保系统安全。

##### 维护与扩展

- 提供易用的后台管理系统，便于系统管理员进行系统维护和升级。
- 设计系统时考虑未来可能的功能扩展，如增加新的用户角色、支持更多种类的原料管理等。

#### 2.E-R图

![ER图](C:\Users\Administrator\Desktop\dbexp\ER图.png)

#### 3.搭建数据库

1. demo数据库

   | 表名       | 表信息解释               |
   | ---------- | ------------------------ |
   | login      | 存储账号、密码、身份信息 |
   | part_list  | 存储零件基本信息         |
   | order_form | 存储订单详细信息         |
   | project    | 存储供应商创建的项目信息 |
   | supplier   | 存储供应商的基本信息     |
   | warehouse  | 存储仓库的基本信息       |
   | wm         | 存储仓库管理员的基本信息 |
   | inventory  | 存储仓库库存信息         |
   

   
2. login表

   | 属性名   | 数据类型    | 主外码 | 解释     |
   | -------- | ----------- | ------ | -------- |
   | userName | VARCHAR(50) | P      | 账号     |
   | userPwd  | VARCHAR(50) |        | 密码     |
   | status   | VARCHAR(45) |        | 用户身份 |

   

3. order_form表

   | 属性名   | 数据类型    | 主外码 | 解释         |
   | -------- | ----------- | ------ | ------------ |
   | oid      | INT         | P      | 订单号       |
   | sno      | VARCHAR(45) | F      | 供应商号     |
   | pno      | VARCHAR(45) |        | 零件号       |
   | wno      | VARCHAR(45) | F      | 仓库号       |
   | quantity | INT         |        | 供应量(万个) |
   | status   | VARCHAR(20) |        | 出入库状态   |

   

4. part_list表

   | 属性名        | 数据类型    | 主外码 | 解释                              |
   | ------------- | ----------- | ------ | --------------------------------- |
   | pno | VARCHAR(45) | P      | 零件号                       |
   | pname     | VARCHAR(45) |        | 零件名称                      |
   | unit_price | VARCHAR(45) |        | 单价(元/个) |
   | size         | VARCHAR(45) |        | 规格(cm)                |
   | describes | VARCHAR(50) |        | 零件描述                    |
   | sno     | VARCHAR(45) | F | 供应商号                  |




5. project表

   | 属性名 | 数据类型    | 主外码 | 解释           |
   | ------ | ----------- | ------ | -------------- |
   | pid    | VARCHAR(45) | P      | 项目号         |
   | budget | VARCHAR(45) |        | 项目预算(万元) |
   | date   | VARCHAR(45) |        | 开工日期       |
   | sno    | VARCHAR(45) | P,F    | 供应商号       |

   

6. supplier表

   | 属性名   | 数据类型    | 主外码 | 解释       |
   | -------- | ----------- | ------ | ---------- |
   | sno      | VARCHAR(45) | P      | 供应商号   |
   | sname    | VARCHAR(45) |        | 供应商姓名 |
   | address  | VARCHAR(45) |        | 地址       |
   | phone    | VARCHAR(20) |        | 电话号码   |
   | userName | VARCHAR(50) | F      | 账号       |

   

7. warehouse表

   | 属性名 | 数据类型    | 主外码 | 解释         |
   | ------ | ----------- | ------ | ------------ |
   | wno    | VARCHAR(45) | P      | 仓库号       |
   | square | VARCHAR(45) |        | 面积(m^2)    |
   | phone  | VARCHAR(45) |        | 电话号码     |
   | noa    | INT         |        | 仓库职工人数 |

   

8. wm表

   | 属性名     | 数据类型    | 主外码 | 解释       |
   | ---------- | ----------- | ------ | ---------- |
   | wmno       | VARCHAR(45) | P      | 仓库职工号 |
   | wname      | VARCHAR(45) |        | 职工姓名   |
   | profession | VARCHAR(20) |        | 职称       |
   | leader     | VARCHAR(45) |        | 领导职工号 |
   | wno        | VARCHAR(45) | F      | 从属仓库号 |
   | userName   | VARCHAR(50) | F      | 用户名     |

   

9. inventory表

   | 属性名   | 数据类型    | 主外码 | 解释     |
   | -------- | ----------- | ------ | -------- |
   | pno      | VARCHAR(45) | P      | 零件号   |
   | sno      | VARCHAR(45) | F      | 供应商号 |
   | quantity | INT         |        | 供应量   |
| wno      | VARCHAR(45) | F      | 仓库号   |
   
   

### 五. 使用说明、功能简介

#### 路由配置以及数据库连接

`app.js`

``` javascript
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

```
`mysql.js`

``` javascript
const mysql =require('mysql');
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "87560736",
	database: "demo"
});

db.connect();

module.exports = db;
```
#### 账户功能列表

##### 1.登录页面

**页面展示：**![2](C:\Users\Administrator\Desktop\dbexp\2.png)

**代码详解：**

views/login.ejs
``` html
<!DOCTYPE html>
<html>
  <head>
	<title>用户登录界面</title>
	<meta charset="utf-8">
    <link rel='stylesheet' href='/stylesheets/common.css' />
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
	<div class="container">
		<h3><div>仓库管理系统</div></h3>
		<div class="pic">
			<img src="/images/fufu1_open.png" id="fufu1" width="150" height="150">
			&nbsp&nbsp&nbsp
			<img src="/images/fufu2_open.png" id="fufu2" width="150" height="150">
		</div>
		<form action="/admin/main" method="post">
			<div class='form-group'>
				<label>用户名</label>
				<input type="text" id="userName" name="userName">
			</div>
			<div class='form-group'>
				<label>密码</label>
				<input type="password" id="userPwd" name="userPwd">
			</div>
			<div class='form-group'>
				<label>身份</label>
				<div class='radio-group'>
					<input type="radio" name="status" value="supplier" checked>
					<label>物料供应商</label>
				</div>
				<div class='radio-group'>
					<input type="radio" name="status" value="wm">
					<label>仓库管理员</label>
				</div>
			</div>
			<input type="submit" value="登录">
		</form>
		<button id="userRegister">点击注册</button>
	</div>
	<script src="/javascripts/changepic.js"></script>
	<script src="/javascripts/l2r.js"></script>
  </body>
</html>
```
routes/login.js
``` javascript
router.post('/main', function(req, res, next) {
	var info = req.body;
	//查询数据
	console.log(info);
	db.query("select * from login where userName=? and userPwd=? and status=?",[info.userName,info.userPwd,info.status],(err,results,fields)=>{
		if(err){
			throw err;
		}
		else if(results.length > 0){
			// todo,用于供应商第一次登录时注册个人信息
			res.render('main', {userName: info.userName,
								status: info.status});
		}
		else{
			res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
			res.end('账号或密码不正确!(或者该账户身份错误，没有登录权限!)');
		}
	})
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
	res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	var info = req.body;
	//查询数据
	db.query("select * from login where userName=?",[info.userName],(err,results,fields)=>{
		if(err){
			throw err;
		}
		else if(results.length > 0){
			res.end('该用户名已存在!');
		}
		else if(info.userPwd != info.repeatPwd){
			res.end("确认密码与之前密码不一致!");
		}
		else{
			db.query("insert into login values (?,?,?)",[info.userName,info.userPwd,info.status],(err,results,fields)=>{
				if(err) throw err;
				res.write("注册成功!");
				res.end();
			})
		}
	})
});
```
**使用说明：**

用户可输入自己的账号密码，根据自己的身份选择角色登录，员工也可以点击**点击注册**跳转到注册界面

##### 2.注册页面

**页面展示：![3](C:\Users\Administrator\Desktop\dbexp\3.png)**

**代码详解：**

views/register.ejs
```html
<!DOCTYPE html>
<html>
  <head>
	<title>用户注册界面</title>
	<meta charset="utf-8">
    <link rel='stylesheet' href='/stylesheets/common.css' />
    <link rel='stylesheet' href='/stylesheets/style_r.css' />
  </head>
  <body>
	<div class="container">
		<h3><div>用户注册界面</div></h3>
		<div class="pic">
			<img src="/images/fufu1_open.png" id="fufu1" width="150" height="150">
			&nbsp&nbsp&nbsp
			<img src="/images/fufu2_open.png" id="fufu2" width="150" height="150">
		</div>
		<form action="/admin/register" method="post">
			<div class='form-group'>
				<label>用户名</label>
				<input type="text" id="userName" name="userName">
			</div>
			<div class='form-group'>
				<label>密码</label>
				<input type="password" id="userPwd" name="userPwd">
			</div>
			<div class='form-group'>
				<label>确认密码</label>
				<input type="password" id="repeatPwd" name="repeatPwd">
			</div>
			<div class='form-group'>
				<label>身份</label>
				<div class='radio-group'>
					<input type="radio" name="status" value="supplier" checked>
					<label>物料供应商</label>
				</div>
				<div class='radio-group'>
					<input type="radio" name="status" value="wm">
					<label>仓库管理员</label>
				</div>
			</div>
			<input type="submit" value="注册">
		</form>
		<button id="userLogin">返回登录界面</button>
	</div>
	<script src="/javascripts/changepic.js"></script>
	<script src="/javascripts/r2l.js"></script>
  </body>
</html>
```
routes/login.js
```javascript
router.post('/register', function(req, res, next) {
	res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	var info = req.body;
	//查询数据
	db.query("select * from login where userName=?",[info.userName],(err,results,fields)=>{
		if(err){
			throw err;
		}
		else if(results.length > 0){
			res.end('该用户名已存在!');
		}
		else if(info.userPwd != info.repeatPwd){
			res.end("确认密码与之前密码不一致!");
		}
		else{
			db.query("insert into login values (?,?,?)",[info.userName,info.userPwd,info.status],(err,results,fields)=>{
				if(err) throw err;
				res.write("注册成功!");
				res.end();
			})
		}
	})
});
```
**使用说明：**

用户可以根据自己的身份注册物料供应商或者仓库管理员的账号，并设置密码。

设置完成后，点击注册账号即可注册。若账号已存在，则会注册失败。注册成功会弹出提示，点击返回登录界面即可返回登录界面。

**供应商身份登录：**



![4](C:\Users\Administrator\Desktop\dbexp\4.png)

**仓库管理员身份登录：**

![5](C:\Users\Administrator\Desktop\dbexp\5.png)

**代码详解：**

views/menu_s.ejs
```html
<!DOCTYPE html>
<html>
  <head>
    <title>左界面</title>
	<meta charset="utf-8">
	<link rel='stylesheet' href='/stylesheets/common.css' />
    <link rel='stylesheet' href='/stylesheets/left_style.css' />
  </head>
  
  <body>
	<div class="nav-left">
		<h3>
			<img src="/images/killer.png" width="80px" height="120px">
		</h3>
		<ul>
			<li>
				<div class="menu active">
					<img src="/images/logo1.png" width="20px" height="20px">
					<span>首页</span>
				</div>
				<ul>
					<li class="menu">
					<img src="/images/logo1.png" width="20px" height="20px">
					<a href="/tablelist?userName=<%= userName %>" target="right">零件信息</a>
					</li>
					<li class="menu">
					<img src="/images/logo1.png" width="20px" height="20px">
					<a href="/tablelist/order?userName=<%= userName %>" target="right">供应订单</a>
					</li>
					<li class="menu">
					<img src="/images/logo1.png" width="20px" height="20px">
					<a href="/tablelist/project?userName=<%= userName %>" target="right">项目信息</a>
					</li>
				</ul>
			</li>
		</ul>
		<ul>
			<li>
				<div class="menu">
					<img src="/images/logo1.png" width="20px" height="20px">
					<a href="/information/supplier?userName=<%= userName %>" target="right">用户个人信息</a>
				</div>
			</li>
		</ul>
		<a class="logout" href="/admin" target="_parent">退出登录</a>
	</div>
	<script src="/javascripts/jquery.js"></script>
	<script>
		$(function(){
			$('.nav-left > ul > li').click(function(){	
				$('.nav-left > ul > li').find('div.menu').removeClass('active');
				$(this).find('div.menu').addClass('active');
				
				$('.nav-left > ul > li').find('ul').slideUp(200);
				$(this).find('ul').slideDown(200);
			})
		})
	</script>
  </body>
</html>
```
views/menu_w.ejs

```html
<!DOCTYPE html>
<html>
  <head>
    <title>左界面</title>
	<meta charset="utf-8">
	<link rel='stylesheet' href='/stylesheets/common.css' />
    <link rel='stylesheet' href='/stylesheets/left_style.css' />
  </head>
  
  <body>
	<div class="nav-left">
		<h3>
			<img src="/images/killer.png" width="80px" height="120px">
		</h3>
		<ul>
			<li>
				<div class="menu active">
					<img src="/images/logo1.png" width="20px" height="20px">
					<span>首页</span>
				</div>
				<ul>
					<li class="menu">
					<img src="/images/logo1.png" width="20px" height="20px">
					<a href="/warehouse?userName=<%= userName %>" target="right">仓库库存</a>
					</li>
					<li class="menu">
					<img src="/images/logo1.png" width="20px" height="20px">
					<a href="/warehouse/order?userName=<%= userName %>" target="right">供应订单</a>
					</li>
					<li class="menu">
					<img src="/images/logo1.png" width="20px" height="20px">
					<a href="/warehouse/employee?userName=<%= userName %>" target="right">职工信息</a>
					</li>
				</ul>
			</li>
		</ul>
		<ul>
			<li>
				<div class="menu">
					<img src="/images/logo1.png" width="20px" height="20px">
					<span>背景信息</span>
				</div>
				<ul>
					<li class="menu">
					<img src="/images/logo1.png" width="20px" height="20px">
					<a href="/information/wm?userName=<%= userName %>" target="right">用户个人信息</a>
					</li>
					<li class="menu">
					<img src="/images/logo1.png" width="20px" height="20px">
					<a href="/information/warehouse?userName=<%= userName %>" target="right">从属仓库信息</a>
					</li>
				</ul>
			</li>
		</ul>
		<a class="logout" href="/admin" target="_parent">退出登录</a>
	</div>
	<script src="/javascripts/jquery.js"></script>
	<script>
		$(function(){
			$('.nav-left > ul > li').click(function(){	
				$('.nav-left > ul > li').find('div.menu').removeClass('active');
				$(this).find('div.menu').addClass('active');
				
				$('.nav-left > ul > li').find('ul').slideUp(200);
				$(this).find('ul').slideDown(200);
			})
		})
	</script>
  </body>
</html>
```

**使用说明：**

用户可点击左侧的菜单栏跳转到对应分区操作。可点击下拉箭头展开，上拉箭头收回，左拉箭头收缩菜单，右拉箭头展开菜单。可点击**退出**返回登录界面

#### 供应商功能列表（只显示当前登录的供应商拥有权限的数据）

##### 1.零件管理

**页面展示：**![6](C:\Users\Administrator\Desktop\dbexp\6.png)

点击添加按钮：![7](C:\Users\Administrator\Desktop\dbexp\7.png)

点击删除按钮：![8](C:\Users\Administrator\Desktop\dbexp\8.png)

点击修改按钮：![9](C:\Users\Administrator\Desktop\dbexp\9.png)

查询功能：![10](C:\Users\Administrator\Desktop\dbexp\10.png)

**代码详解：**

```javascript
  <script>
	$(function(){
		var pno = '';
		var updateHtml = '';
		//显示表单
		$('#addBtn').click(function(){
			$('.isDialog').show();
		})
		//隐藏表单
		$('.close,.cancel').click(function(){
			$('.isDialog').hide();
		})
		//点击删除
		$('.del').click(function(){
			pno = $(this).data('id');
			$('.isDelete').show();
		})
		//隐藏删除
		$('.close,.cancel').click(function(){
			$('.isDelete').hide();
		})
		//点击确定删除
		$('.determineDel').click(function(){
			window.location.href = `/del?pno=${pno}&sno=<%= sno %>`;
		})
		
		//点击修改操作
		$('.edit').click(function(){
			var updateId = $(this).data('id');
			var updateName = $(this).data('pname');
			var updatePrice = $(this).data('unit_price');
			var updateSize = $(this).data('size');
			var updateDescribes = $(this).data('describes');
			updateHtml = `
			<div class="dialog isUpdate"></div>
				<div class="dialog-wrap isUpdate">
				<div class="dialog-header">
					<h3>修改零件</h3>
					<div class="close">
						<img src="/images/close.png" style="width:25px;height:25px">
					</div>
				</div>
				<form action="/updatePart" method="post">
					<div>
						<p>零件号: ${updateId}</p>
						<p>
							<input type="text" class="form-control" name="pno" value="${updateId}" style="display: none;" />
						</p>
					</div>
					<div>
						<p>名称</p>
						<p>
							<input type="text" class="form-control" name="pname" value="${updateName}" />
						</p>
					</div>
					<div>
						<p>单价(元/个)</p>
						<p>
							<input type="text" class="form-control" name="unit_price" value="${updatePrice}" />
						</p>
					</div>
					<div>
						<p>规格(cm)</p>
						<p>
							<input type="text" class="form-control" name="size" value="${updateSize}" />
						</p>
					</div>
					<div>
						<p>描述</p>
						<p>
							<input type="text" class="form-control" name="describe" value="${updateDescribes}" />
						</p>
					</div>
					<div>
						<p>
							<input type="text" class="form-control" name="sno" value="<%= sno %>" style="display: none;" />
						</p>
					</div>			
					<div class="dialog-submit">
						<button class="determine">确定</button>
					</div>
				</form>
				<div class="dialog-table-update">
					<button class="cancel">取消</button>	
				</div>
			</div>
			`
		 	$('body').append( updateHtml );
		})
		
		//取消修改操作
		$('body').on('click','.close,.cancel',function(){
			$('.isUpdate').hide();
		})
	})
  </script>
```

routes/addPart.js
```javascript
router.post('/', function(req, res, next) {
	var info = req.body;
	console.log(info);
	if(info.describe == ''){
		info.describe = '无';
	}
	db.query('select * from part_list where pno=? and sno=?',[info.pno,info.sno],(err,exist)=>{
		if(err) throw err;
		else if(exist.length > 0){
			res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
			res.end('该零件已经存在!');
		}
		else{
			db.query('insert into part_list value(?,?,?,?,?,?)',
			[info.pno,info.pname,info.unit_price,info.size,info.describe,info.sno],(err,data)=>{
				if(err) throw err;
				db.query('select * from part_list where sno=?',[info.sno],(err,results)=>{
					if(err) throw err;
					res.render('tablelist',{tablelist: results,
											sno: info.sno});
				})
			})
		}
	})
});
```
routes/del.js
```javascript
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
```
routes/updatePart.js
```javascript
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
```
routes/like.js
```javascript
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
```
**使用说明：**

点击添加按钮：输入零件号，零件名称，单价，规格，描述即可添加，点击取消可返回

点击删除按钮：点击确定既删除，点击取消可返回

点击修改按钮：修改对应信息后点击确定即可修改，点击取消可返回

查询功能：可按零件号，零件名称，单价，规格，描述进行模糊匹配查询

##### 2.供应订单管理

**页面展示：**![11](C:\Users\Administrator\Desktop\dbexp\12.png)

点击添加按钮：![13](C:\Users\Administrator\Desktop\dbexp\13.png)

点击删除按钮：![14](C:\Users\Administrator\Desktop\dbexp\14.png)

点击修改按钮：![15](C:\Users\Administrator\Desktop\dbexp\15.png)

查询功能：![16](C:\Users\Administrator\Desktop\dbexp\16.png)

**代码详解：**

```javascript
  <script>
	$(function(){
		var id = '';
		var updateHtml = '';
		var state = '';
		//显示表单
		$('#addBtn').click(function(){
			$('.isDialog').show();
		})
		//隐藏表单
		$('.close,.cancel').click(function(){
			$('.isDialog').hide();
		})
		//点击删除
		$('.del').click(function(){
			id = $(this).data('id');
			state = $(this).data('state');
			$('.isDelete').show();
		})
		//隐藏删除
		$('.close,.cancel').click(function(){
			$('.isDelete').hide();
		})
		//点击确定删除
		$('.determineDel').click(function(){
			window.location.href = `/del/order?oid=${id}&sno=<%= sno %>&state=${state}`;
		})
		
		//点击修改操作
		$('.edit').click(function(){
			var updateId = $(this).data('id');
			var updatePno = $(this).data('pno');
			var updateWno = $(this).data('wno');
			var updateQuantity = $(this).data('quantity');
			var updateState = $(this).data('state');
			updateHtml = `
			<div class="dialog isUpdate"></div>
				<div class="dialog-wrap isUpdate">
				<div class="dialog-header">
					<h3>修改订单</h3>
					<div class="close">
						<img src="/images/close.png" style="width:25px;height:25px">
					</div>
				</div>
				<form action="/updatePart/order" method="post">
					<div>
						<p>订单号: ${updateId}</p>
						<p>
							<input type="text" class="form-control" name="oid" value="${updateId}" style="display: none;" />
						</p>
					</div>
					<div>
						<p>原零件号: ${updatePno}</p>
						<p>
							<div class="no-select">
							<select name="pno">
								<% pnolist.forEach(function(item){ %>
									<option value="<%= item.pno %>"><%= item.pno %></option>
								<% }) %>
							</select>
							</div>
						</p>
					</div>
					<div>
						<p>原仓库号: ${updateWno}</p>
						<p>
							<div class="no-select">
							<select name="wno">
								<% wnolist.forEach(function(item){ %>
									<option value="<%= item.wno %>"><%= item.wno %></option>
								<% }) %>
							</select>
							</div>
						</p>
					</div>
					<div>
						<p>供应量(万个)</p>
						<p>
							<input type="text" class="form-control" name="quantity" value="${updateQuantity}" />
						</p>
					</div>
					<div>
						<p>状态: ${updateState}(如果已入库则无法修改订单)</p>
						<p>
							<input type="text" class="form-control" name="state" value="${updateState}" style="display: none;" />
						</p>
					</div>
					<div>
						<p>
							<input type="text" class="form-control" name="sno" value="<%= sno %>" style="display: none;" />
						</p>
					</div>			
					<div class="dialog-submit">
						<button class="determine">确定</button>
					</div>
				</form>
				<div class="dialog-order-update">
					<button class="cancel">取消</button>	
				</div>
			</div>
			`
		 	$('body').append( updateHtml );
		})
		
		//取消修改操作
		$('body').on('click','.close,.cancel',function(){
			$('.isUpdate').hide();
		})
	})
  </script>
```

routes/addPart.js
```javascript
router.post('/order', function(req, res, next) {
	var info = req.body;
	console.log(info);
	db.query('select * from part_list where sno=?',[info.sno],(err,exist_p)=>{
		if(err) throw err;
		else if(exist_p.length > 0){
			db.query('select * from warehouse',[],(err,exist_w)=>{
				if(err) throw err;
				else if(exist_w.length > 0){
					db.query('insert into order_form (sno,pno,wno,quantity,state) value(?,?,?,?,?)',
					[info.sno,info.pno,info.wno,Number(info.quantity),info.state],(err,data)=>{
						if(err) throw err;
						db.query('select * from order_form where sno=?',[info.sno],(err,results)=>{
							if(err) throw err;
							res.render('order_s',{tablelist: results,
												  pnolist: exist_p,
												  wnolist: exist_w,
												  sno: info.sno});
						})
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
});
```
routes/del.js
```javascript
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
```
routes/updatePart.js
```javascript
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
```
routes/like.js
```javascript
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
```

**使用说明：**

点击添加按钮：选择对应的零件号，仓库号，供应量，订单号由系统自动自增添加，状态默认为**等待确认**点击确定即可添加

点击删除按钮：点击确定既删除，点击取消可返回

点击修改按钮：修改对应信息后点击确定即可修改，点击取消可返回

查询功能：可按照零件号，仓库号，供应量，订单号，订单状态进行模糊查询

##### 3.项目信息管理

**页面展示：**![17](C:\Users\Administrator\Desktop\dbexp\17.png)

点击添加按钮：![18](C:\Users\Administrator\Desktop\dbexp\18.png)

点击删除按钮：![19](C:\Users\Administrator\Desktop\dbexp\19.png)

点击修改按钮：![20](C:\Users\Administrator\Desktop\dbexp\20.png)

查询功能：![21](C:\Users\Administrator\Desktop\dbexp\21.png)

**代码详解：**

```javascript
  <script>
	$(function(){
		var id = '';
		var updateHtml = '';
		//显示表单
		$('#addBtn').click(function(){
			$('.isDialog').show();
		})
		//隐藏表单
		$('.close,.cancel').click(function(){
			$('.isDialog').hide();
		})
		//点击删除
		$('.del').click(function(){
			id = $(this).data('id');
			$('.isDelete').show();
		})
		//隐藏删除
		$('.close,.cancel').click(function(){
			$('.isDelete').hide();
		})
		//点击确定删除
		$('.determineDel').click(function(){
			window.location.href = `/del/project?pid=${id}&sno=<%= sno %>`;
		})
		
		//点击修改操作
		$('.edit').click(function(){
			var updateId = $(this).data('id');
			var updateBudget = $(this).data('budget');
			var updateDate = $(this).data('date');
			updateHtml = `
			<div class="dialog isUpdate"></div>
				<div class="dialog-wrap isUpdate">
				<div class="dialog-header">
					<h3>修改项目</h3>
					<div class="close">
						<img src="/images/close.png" style="width:25px;height:25px">
					</div>
				</div>
				<form action="/updatePart/project" method="post">
					<div>
						<p>项目号: ${updateId}</p>
						<p>
							<input type="text" class="form-control" name="pid" value="${updateId}" style="display: none;" />
						</p>
					</div>
					<div>
						<p>预算(万元)</p>
						<p>
							<input type="text" class="form-control" name="budget" value="${updateBudget}" />
						</p>
					</div>
					<div>
						<p>开工日期</p>
						<p>
							<input type="text" class="form-control" name="date" value="${updateDate}" />
						</p>
					</div>
					<div>
						<p>
							<input type="text" class="form-control" name="sno" value="<%= sno %>" style="display: none;" />
						</p>
					</div>			
					<div class="dialog-submit">
						<button class="determine">确定</button>
					</div>
				</form>
				<div class="dialog-project-update">
					<button class="cancel">取消</button>	
				</div>
			</div>
			`
		 	$('body').append( updateHtml );
		})
		
		//取消修改操作
		$('body').on('click','.close,.cancel',function(){
			$('.isUpdate').hide();
		})
	})
  </script>
```

routes/addPart.js
```javascript
router.post('/order', function(req, res, next) {
	var info = req.body;
	console.log(info);
	db.query('select * from part_list where sno=?',[info.sno],(err,exist_p)=>{
		if(err) throw err;
		else if(exist_p.length > 0){
			db.query('select * from warehouse',[],(err,exist_w)=>{
				if(err) throw err;
				else if(exist_w.length > 0){
					db.query('insert into order_form (sno,pno,wno,quantity,state) value(?,?,?,?,?)',
					[info.sno,info.pno,info.wno,Number(info.quantity),info.state],(err,data)=>{
						if(err) throw err;
						db.query('select * from order_form where sno=?',[info.sno],(err,results)=>{
							if(err) throw err;
							res.render('order_s',{tablelist: results,
												  pnolist: exist_p,
												  wnolist: exist_w,
												  sno: info.sno});
						})
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
});

router.post('/project', function(req, res, next) {
	var info = req.body;
	console.log(info);
	var date = '北京时间 ' + info.year + '年' + info.month + '月' + info.day + '日';
	db.query('select * from project where pid=? and sno=?',[info.pid,info.sno],(err,exist)=>{
		if(err) throw err;
		else if(exist.length > 0){
			res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
			res.end('该项目已经存在!');
		}
		else{
			db.query('insert into project value(?,?,?,?)',
			[info.pid,info.budget,date,info.sno],(err,data)=>{
				if(err) throw err;
				db.query('select * from project where sno=?',[info.sno],(err,results)=>{
					if(err) throw err;
					res.render('project',{tablelist: results,
											sno: info.sno});
				})
			})
		}
	})
});
```
routes/del.js
```javascript
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
```
routes/updatePart.js
```javascript
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

```
routes/like.js
```javascript
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
```

**使用说明：**
点击添加按钮：输入项目号，预算，开工日期即可添加

点击删除按钮：点击确定既删除，点击取消可返回

点击修改按钮：修改对应信息后点击确定即可修改，点击取消可返回

查询功能：可按照项目号，预算，开工日期模糊查询
##### 4.用户个人信息维护

**页面展示：**![22](C:\Users\Administrator\Desktop\dbexp\22.png)

点击**修改信息**按钮(或首次登录)：![23](C:\Users\Administrator\Desktop\dbexp\23.png)

**代码详解：**

routes/information.js
```javascript
router.get('/supplier', function(req, res, next) {
	var info = req.query;
	db.query('select * from supplier where userName=?',[info.userName],(err,results,fields)=>{
		if(err){
			throw err;
		}
		else if(results.length > 0){
			res.render('supplier', {infolist: results[0], 
									userName: info.userName});
		}
		else{
			res.render('modify_s', {userName: info.userName});
		}
	})
});

router.get('/modify_s', function(req, res, next) {
	var info = req.query;
	res.render('modify_s', {userName: info.userName});
});

router.post('/modify_s', function(req, res, next){
	res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	var info = req.body;
	console.log(info);
	db.query('select * from supplier where userName=?',[info.userName],(err,exist,fields)=>{
		if(err){
			throw err;
		}
		else if(exist.length > 0){
			db.query('select * from supplier where sno=? and userName<>?',[info.sno,info.userName],(err,results)=>{
				if(err){
					throw err;
				}
				else if(results.length > 0){
					res.end('该供应商号已存在!');
				}
				else{
					db.query('update supplier set sno=?,sname=?,address=?,phone=? where userName=?',
					[info.sno,info.sname,info.address,info.phone,info.userName],(err,data)=>{
						if(err) throw err;
						res.end('修改成功!')
					})
				}
			})
		}
		else{
			db.query('select * from supplier where sno=?',[info.sno],(err,results)=>{
				if(err){
					throw err;
				}
				else if(results.length > 0){
					res.end('该供应商号已存在!');
				}
				else{
					db.query('insert into supplier value(?,?,?,?,?)',
					[info.sno,info.sname,info.address,info.phone,info.userName],(err,data)=>{
						if(err) throw err;
						res.end('修改成功!');
					})
				}
			})
		}
	})
});
```
**使用说明：**
点击左侧用户个人信息：查看该账号有关的所有信息

点击修改信息按钮：进入修改界面

点击修改完成按钮：将填写好的供应商号，姓名，地址，电话对应信息添加到数据库中

点击退出修改：返回查看信息界面

#### 仓库高级管理员列表（只显示当前仓库管理员拥有权限的数据）

##### 1.仓库管理

**页面展示：**![24](C:\Users\Administrator\Desktop\dbexp\24.png)

![39](C:\Users\Administrator\Desktop\dbexp\39.png)

点击**新建仓库**按钮：![25](C:\Users\Administrator\Desktop\dbexp\25.png)

点击出库按钮：![26](C:\Users\Administrator\Desktop\dbexp\26.png)

点击详细信息按钮：![27](C:\Users\Administrator\Desktop\dbexp\27.png)

查询功能：![28](C:\Users\Administrator\Desktop\dbexp\28.png)

**代码详解：**

```javascript
  <script>
	$(function(){
		var pno = '';
		var sno = '';
		var updateHtml = '';
		//显示表单
		$('#addBBtn').click(function(){
			$('.isDialog').show();
		})
		//隐藏表单
		$('.close,.cancel').click(function(){
			$('.isDialog').hide();
		})
		//点击删除
		$('.del').click(function(){
			pno = $(this).data('pno');
			sno = $(this).data('sno');
			$('.isDelete').show();
		})
		//隐藏删除
		$('.close,.cancel').click(function(){
			$('.isDelete').hide();
		})
		//点击确定删除
		$('.determineDel').click(function(){
			window.location.href = `/delWare?pno=${pno}&sno=${sno}&wno=<%= wno %>`;
		})
		
		//点击修改操作
		$('.specific').click(function(){
			var spPno = $(this).data('pno');
			var spSno = $(this).data('sno');
			window.location.href = `/information/details?pno=${spPno}&sno=${spSno}`;
		})
		
		//取消修改操作
		$('body').on('click','.close,.cancel',function(){
			$('.isUpdate').hide();
		})
	})
  </script>
```

routes/addWare.js
```javascript
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

```
routes/delWare.js
```javascript
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
```
routes/likeWare.js
```javascript
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
```
routes/information.js & views/details
```HTML
router.get('/details', function(req, res, next) {
	var info = req.query;
	db.query('select * from part_list where pno=? and sno=?',[info.pno,info.sno],(err,results)=>{
		if(err) throw err;
		res.render('details', {infolist: results[0]});
	})
});

<!DOCTYPE html>
<html>
  <head>
    <title>零件详情表</title>
	<meta charset="utf-8">
	<link rel='stylesheet' href='/stylesheets/bootstrap.min.css' />
	<link rel='stylesheet' href='/stylesheets/common.css' />
	<link rel='stylesheet' href='/stylesheets/table_style.css' />
  </head>
  <body>
    <div class="container">
	<div class="dialog"></div>
	<div class="dialog-wrap">
		<div class="dialog-header">
			<h3>零件详情</h3>
			<div class="close">
				<img src="/images/close.png" style="width:25px;height:25px">
			</div>
		</div>
		<form action="" method="post">
			<div>
				<p>零件号: <%= infolist.pno %></p>
			</div>
			<div>
				<p>零件名称: <%= infolist.pname %></p>
			</div>
			<div>
				<p>单价: <%= infolist.unit_price %></p>
			</div>
			<div>
				<p>规格: <%= infolist.size %></p>
			</div>
			<div>
				<p>描述: <%= infolist.describes %></p>
			</div>
			<div>
				<p>供应商号: <%= infolist.sno %></p>
			</div>
		</form>
	</div>
	</div>
  </body>
</html>
```

**使用说明：**

点击新建仓库按钮：输入对应仓库号，联系电话，面积即可新建仓库

点击出库按钮：点击确定即删除，点击取消可返回

点击详细信息按钮：查看该库存零件的详细信息

查询功能：选择对应查询，可实现模糊查询
##### 2.供应订单管理

**页面展示：**![29](C:\Users\Administrator\Desktop\dbexp\29.png)

点击入库按钮：![30](C:\Users\Administrator\Desktop\dbexp\30.png)

点击详细信息按钮：![31](C:\Users\Administrator\Desktop\dbexp\31.png)

查询功能：![32](C:\Users\Administrator\Desktop\dbexp\32.png)

**代码详解：**

```javascript
  <script>
	$(function(){
		var id = '';
		var pno = '';
		var sno = '';
		var quantity = '';
		var state = '';
		var updateHtml = '';
		//显示表单
		$('#addBtn').click(function(){
			$('.isDialog').show();
		})
		//隐藏表单
		$('.close,.cancel').click(function(){
			$('.isDialog').hide();
		})
		//点击删除
		$('.inbound').click(function(){
			id = $(this).data('id')
			pno = $(this).data('pno');
			sno = $(this).data('sno');
			quantity = $(this).data('quantity');
			state = $(this).data('state');
			$('.isDelete').show();
		})
		//隐藏删除
		$('.close,.cancel').click(function(){
			$('.isDelete').hide();
		})
		//点击确定删除
		$('.determineDel').click(function(){
			window.location.href = `/addWare/order?oid=${id}&pno=${pno}&sno=${sno}&quantity=${quantity}&state=${state}&wno=<%= wno %>`;
		})
		
		//点击修改操作
		$('.specific').click(function(){
			var spPno = $(this).data('pno');
			var spSno = $(this).data('sno');
			window.location.href = `/information/details?pno=${spPno}&sno=${spSno}`;
		})
		
		//取消修改操作
		$('body').on('click','.close,.cancel',function(){
			$('.isUpdate').hide();
		})
	})
  </script>
```

routes/addWare.js
```javascript
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
```
routes/information.js & views/details

```HTML
router.get('/details', function(req, res, next) {
	var info = req.query;
	db.query('select * from part_list where pno=? and sno=?',[info.pno,info.sno],(err,results)=>{
		if(err) throw err;
		res.render('details', {infolist: results[0]});
	})
});

<!DOCTYPE html>
<html>
  <head>
    <title>零件详情表</title>
	<meta charset="utf-8">
	<link rel='stylesheet' href='/stylesheets/bootstrap.min.css' />
	<link rel='stylesheet' href='/stylesheets/common.css' />
	<link rel='stylesheet' href='/stylesheets/table_style.css' />
  </head>
  <body>
    <div class="container">
	<div class="dialog"></div>
	<div class="dialog-wrap">
		<div class="dialog-header">
			<h3>零件详情</h3>
			<div class="close">
				<img src="/images/close.png" style="width:25px;height:25px">
			</div>
		</div>
		<form action="" method="post">
			<div>
				<p>零件号: <%= infolist.pno %></p>
			</div>
			<div>
				<p>零件名称: <%= infolist.pname %></p>
			</div>
			<div>
				<p>单价: <%= infolist.unit_price %></p>
			</div>
			<div>
				<p>规格: <%= infolist.size %></p>
			</div>
			<div>
				<p>描述: <%= infolist.describes %></p>
			</div>
			<div>
				<p>供应商号: <%= infolist.sno %></p>
			</div>
		</form>
	</div>
	</div>
  </body>
</html>
```

routes/likeWare.js

```javascript
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
```
**使用说明：**
点击入库按钮：**将该订单中的零件入库，并在库存信息中添加上入库的零件量**

点击详情按钮：查看该订单中零件的详细信息

查询功能：选择对应查询，可实现模糊查询
##### 3.职工信息管理

**页面展示：**![33](C:\Users\Administrator\Desktop\dbexp\33.png)

点击**雇佣**按钮：![34](C:\Users\Administrator\Desktop\dbexp\34.png)

点击删除按钮：![35](C:\Users\Administrator\Desktop\dbexp\35.png)

查询功能：![36](C:\Users\Administrator\Desktop\dbexp\36.png)

**代码详解：**

```javascript
  <script>
	$(function(){
		var wmno = '';
		var leader = '';
		var updateHtml = '';
		//显示表单
		$('#addBtn').click(function(){
			$('.isDialog').show();
		})
		//隐藏表单
		$('.close,.cancel').click(function(){
			$('.isDialog').hide();
		})
		//点击删除
		$('.hire').click(function(){
			wmno = $(this).data('wmno')
			leader = $(this).data('leader');
			$('.isHire').show();
		})
		
		$('.del').click(function(){
			wmno = $(this).data('wmno')
			leader = $(this).data('leader');
			$('.isDelete').show();
		})
		//隐藏删除
		$('.close,.cancel').click(function(){
			$('.isHire').hide();
		})
		
		$('.close,.cancel').click(function(){
			$('.isDelete').hide();
		})
		//点击确定删除
		$('.determineHire').click(function(){
			window.location.href = `/updateWare/hire?wmno=${wmno}&leader=${leader}&id=<%= wmno %>`;
		})
		
		$('.determineDel').click(function(){
			window.location.href = `/updateWare/fire?wmno=${wmno}&leader=${leader}&id=<%= wmno %>`;
		})
		
		//点击修改操作
		$('.specific').click(function(){
			var spPno = $(this).data('pno');
			var spSno = $(this).data('sno');
			window.location.href = `/information/details?pno=${spPno}&sno=${spSno}`;
		})
		
		//取消修改操作
		$('body').on('click','.close,.cancel',function(){
			$('.isUpdate').hide();
		})
	})
  </script>
```

routes/updateWare.js
```javascript
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
```
routes/warehouse.js
```javascript
router.get('/employee', function(req, res, next) {
	var info = req.query;
	db.query('select * from wm where userName=?',[info.userName],function(err,wnolist){
		if(err) throw err;
		else if(wnolist.length > 0){
			// console.log(snolist[0].sno);
			db.query('select * from wm where wno=?',[wnolist[0].wno],(err,results)=>{
				if(err) throw err;
				res.render('employee',{tablelist: results,
										wno: wnolist[0].wno,
										wmno: wnolist[0].wmno,
										listname: '当前仓库员工'});
			})
		}
		else{
			res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
			res.end('请先在用户个人信息中完善个人信息!');
		}
	})
});

router.post('/employee', function(req, res, next) {
	var info = req.body;
	console.log(info);
	if(info.selectVal == 'current'){
		// console.log(snolist[0].sno);
		db.query('select * from wm where wno=?',[info.wno],(err,results)=>{
			if(err) throw err;
			res.render('employee',{tablelist: results,
									wno: info.wno,
									wmno: info.wmno,
									listname: '当前仓库员工'});
		})
	}
	else if(info.selectVal == 'other'){
		db.query('select * from wm where wno=? and leader=?',[info.wno,'无'],(err,results)=>{
			if(err) throw err;
			res.render('employee',{tablelist: results,
									wno: info.wno,
									wmno: info.wmno,
									listname: '尚未分配领导员工'});
		})
	}
});
```
**使用说明：**
点击雇佣按钮：为未分配领导的职工添加到自己的从属关系

点击删除按钮：为已经分配领导的职工取消到自己的从属关系

查询功能：查当前仓库的所有员工，或者查询尚未分配领导的职工
##### 4.用户个人信息维护

**页面展示：**![37](C:\Users\Administrator\Desktop\dbexp\37.png)

点击修改信息按钮：![38](C:\Users\Administrator\Desktop\dbexp\38.png)

**代码详解：**

routes/information.js
```javascript
router.get('/wm', function(req, res, next) {
	var info = req.query;
	db.query('select * from wm where userName=?',[info.userName],(err,results,fields)=>{
		if(err){
			throw err;
		}
		else if(results.length > 0){
			res.render('wm', {infolist: results[0], 
							  userName: info.userName});
		}
		else{
			db.query('select * from warehouse',[],(err,data)=>{
				if(err) throw err;
				res.render('modify_w', {userName: info.userName,
										wnolist: data});
			})
		}
	})
});

router.get('/modify_w', function(req, res, next) {
	var info = req.query;
	db.query('select * from warehouse',[],(err,data)=>{
		if(err) throw err;
		res.render('modify_w', {userName: info.userName,
								wnolist: data});
	})
});

router.post('/modify_w', function(req, res, next){
	res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	var info = req.body;
	console.log(info);
	db.query('select * from wm where userName=?',[info.userName],(err,exist,fields)=>{
		if(err){
			throw err;
		}
		else if(exist.length > 0){
			db.query('select * from wm where wmno=? and userName<>?',[info.wmno,info.userName],(err,results)=>{
				if(err){
					throw err;
				}
				else if(results.length > 0){
					res.end('该职工号号已存在!');
				}
				else{
					db.query('update warehouse set noa=noa-1 where wno=?',[exist[0].wno],(err,data)=>{
						if(err) throw err;
					})
					db.query('update warehouse set noa=noa+1 where wno=?',[info.wno],(err,data)=>{
						if(err) throw err;
					})
					db.query('update wm set wmno=?,wname=?,profession=?,wno=? where userName=?',
					[info.wmno,info.wname,info.profession,info.wno,info.userName],(err,data)=>{
						if(err) throw err;
					})
					db.query('update wm set leader=?,wno=? where leader=?',
					[info.wmno,info.wno,exist[0].wmno],(err,data)=>{
						if(err) throw err;
					})
					res.end('修改成功!')
				}
			})
		}
		else{
			db.query('select * from wm where wmno=?',[info.wmno],(err,results)=>{
				if(err){
					throw err;
				}
				else if(results.length > 0){
					res.end('该职工号已存在!');
				}
				else{
					db.query('update warehouse set noa=noa+1 where wno=?',[info.wno],(err,data)=>{
						if(err) throw err;
					})
					db.query('insert into wm (wmno,wname,profession,leader,wno,userName) value(?,?,?,?,?,?)',
					[info.wmno,info.wname,info.profession,'无',info.wno,info.userName],(err,data)=>{
						if(err) throw err;
						res.end('修改成功!');
					})
				}
			})
		}
	})
});
```
**使用说明：**

点击左侧用户个人信息：查看该账号有关的所有信息

点击修改信息按钮：进入修改界面

点击修改完成按钮：将填写好的职工号，姓名，职称，选择从属仓库对应信息添加到数据库中。如果从属仓库更改，从属职员也会跟着更改

点击退出修改：返回查看信息界面

#### 仓库普通管理员
##### 功能与仓库高级管理员类似，但没有设置领导的权限

**页面展示：** ![40](C:\Users\Administrator\Desktop\dbexp\40.png)

![41](C:\Users\Administrator\Desktop\dbexp\41.png)

**代码详解：**
routes/updateWare.js

```javascript
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
```
**使用说明：**

仓库普通管理员能够实现零件库存的添加，查找以及出库操作；实现供应订单对应零件的入库，查找以及详细信息操作；实现对所属仓库信息的查看实现用户个人信息的修改。但是对于领导从属关系，**受到仓库系统基于RBAC的权限控制，并没有修改的权限**。

> Criticism and corrections are welcome.
