const sqlite3=require("sqlite3").verbose()
const GenId=require("../utils/SnowFlake")
const path=require("path")    

var db=new sqlite3.Database(path.join(__dirname,"blog.sqlite3"))
const genid=new GenId({WorkerId:1})//机器码 SnowFlake的要求

db.async={}

db.async.all=(sql,params)=> {
    return new Promise((resolve,reject)=>{
        db.all(sql,params,(err,rows)=>{
            resolve({err,rows})
        })
    })
}

db.async.run=(sql,params)=> {
    return new Promise((resolve,reject)=>{
        db.run(sql,params,(err,rows)=>{
            resolve({err,rows})
        })
    })
}

module.exports={db,genid}