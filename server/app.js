
/*
"multer" 管理上传
"sqlite3" 数据库
"uuid" 生成唯一标志 如token
*/
const express=require("express")
const multer=require("multer")
const app=express();
const port=8080



//开放跨域请求
app.use(function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "*");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method == "OPTIONS") res.sendStatus(200); //让options尝试请求快速结束
    else next();
});

app.use(express.json())// 使用Express JSON中间件，以便自动解析请求体中的JSON数据
const update = multer({// 初始化Multer中间件配置，指定临时文件上传目录
    dest:"./public/upload/temp"
})
app.use(update.any())// 使用Multer中间件处理所有的文件上传请求 这将匹配所有路由，并接收任何类型的文件上传

app.use("/test",require("./routers/TestRouter"))// 加载TestRouter模块，用于处理/test相关的路由请求
app.use("/admin",require("./routers/AdminRouter"))

app.get("/",(req,res)=>{
    res.send("helloworld")
})

app.listen(port,()=>{
    console.log(`启动成功：http://localhost:${port}/`);
    
})