const express = require("express")
const router = express.Router()
const { db, genid } = require("../db/DbUtils")
//table tags
//id bigint
//name varchar100

// 列表接口
router.get("/list", async (req, res) => {
    const search_sql = "SELECT * FROM `tags`"
    let { err, rows } = await db.async.all(search_sql, [])
    if (err == null) {
        res.send({
            code: 200,
            msg: "查询Tags成功",
            rows 
        })
    } else {
        res.send({
            code: 500,
            msg: "查询Tags失败"
        })
    }
})

router.get("/listname", async (req, res) => {
    const search_sql = "SELECT `name`, COUNT(`id`) AS count_id FROM `tags` GROUP BY `name`"
    let { err, rows } = await db.async.all(search_sql, [])
    if (err == null) {
        res.send({
            code: 200,
            msg: "查询Tags成功",
            rows 
        })
    } else {
        res.send({
            code: 500,
            msg: "查询Tags失败"
        })
    }
})

//查询
router.get("/queryname", async (req, res) => {
    const search_sql = "SELECT `name` FROM `tags` WHERE `id` = ?"
    const id=req.query.id
    let { err, rows } = await db.async.all(search_sql, [id])
    if (err == null) {
        res.send({
            code: 200,
            msg: "查询Tags成功",
            rows 
        })
    } else {
        res.send({
            code: 500,
            msg: "查询Tags失败"
        })
    }
})

router.get("/queryid", async (req, res) => {
    const search_sql = "SELECT `id` FROM `tags` WHERE `name` = ?"
    const name=req.query.name
    let { err, rows } = await db.async.all(search_sql, [name])
    if (err == null) {
        res.send({
            code: 200,
            msg: "查询Tags成功",
            rows 
        })
    } else {
        res.send({
            code: 500,
            msg: "查询Tags失败"
        })
    }
})

// 删除接口 id对应的全删了
router.delete("/_token/delete", async (req, res) => {
    let id = req.query.id
    const delete_sql = "DELETE FROM `tags` WHERE `id` = ? "
    let { err, rows } = await db.async.run(delete_sql, [id])
    if (err == null) {
        res.send({
            code: 200,
            msg: "删除Tags成功"
        })
    } else {
        res.send({
            code: 500,
            msg: "删除Tags失败"
        })
    }
})



// 添加接口
router.post("/_token/add", async (req, res) => {
    let { id,name } = req.body
    const insert_sql = "INSERT INTO `tags` (`id`,`name`) VALUES (?,?)"
    let { err, rows } = await db.async.run(insert_sql, [id, name])
    if (err == null) {
        res.send({
            code: 200,
            msg: "添加Tags成功"
        })
    } else {
        res.send({
            code: 500,
            msg: "添加Tags失败"
        })
    }
})


module.exports = router