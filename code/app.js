var express = require("express");
var app  = express();
var session = require("express-session");

var VerificationCode = require("./model/VerificationCode.js");

//设置ejs模板
app.set("view engine","ejs");
app.use("/public",express.static("public"));

//开启session
app.use(session({
	secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

/*
 * 路由
 */
app.get("/",function(req,res,exnt){
	res.render('index');
});

app.post("/getCode",function(req,res,next){
	let url = req.url,
      params = url.match(/(\?|&)(len=[^&]*)(&|$)/i),
      number = params ? params[2] ? params[2].split('=')[1] : 4 : 4,
      code = new VerificationCode(number),
      //data = code.getImgbase64()
      data = JSON.stringify(code.getJson());
    res.send(data);
});

app.post("/reg",function(req,res,next){
	console.log(req.body);
});

//404
app.use(function(req,res,next){
	res.send("404");
});

app.listen(80);