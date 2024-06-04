const express = require("express")
const router = express.Router()
const { db, genid } = require("../db/DbUtils")


//查询博客 用于给前端修改文章时用
router.get("/detail", async (req, res) => {

    let { id } = req.query
    let detail_sql = "SELECT * FROM `blog` WHERE `id` = ? "
    let { err, rows } = await db.async.all(detail_sql, [id]) ;

    if (err == null) {
        res.send({
            code: 200,
            msg: "获取成功",
            rows
        })
    } else {
        res.send({
            code: 500,
            msg: "获取失败"
        })
    }

})



//查询博客 包含模糊查询
router.get("/search", async (req, res) => {


    /**
     * keyword 关键字  在标题和内容中同时查找
     * categoryId 分类编号  查找分类 如果没有此分类则不查找（没有找到）
     * 
     * 分页： 
     * page 页码
     * pageSize 分页大小
     * //分页的传给前端定制  事实上有点无关紧要
     */
    let { keyword, categoryId, page, pageSize } = req.query

    page = page == null ? 1 : page;//增加默认值
    pageSize = pageSize == null ? 10 : pageSize
    categoryId = categoryId == null ? 0 : categoryId
    keyword = keyword == null ? "" : keyword

    let params = []//查询参数
    let whereSqls = []//查询语句的条件
    if (categoryId != 0) {//while条件（？
        whereSqls.push(" `category_id` = ? ")
        params.push(categoryId)
    }

    if (keyword != "") {
        whereSqls.push(" (`title` LIKE ? OR `content` LIKE ?) ")//都查
        params.push("%" + keyword + "%")
        params.push("%" + keyword + "%")
    }

    let whereSqlStr = ""//拼装查询语句
    if (whereSqls.length > 0) {
        whereSqlStr = " WHERE " + whereSqls.join(" AND ")
    }

    //查分页数据 时间排序
    let searchSql = " SELECT `id`,`category_id`,`create_time`,`title`,substr(`content`,0,400) AS `content` FROM `blog` " + whereSqlStr + " ORDER BY `create_time` DESC LIMIT ?,? "
    // 1 10  2,10    3,5
    // 0,10  10,10   10,5
    //只传给前端400个字符 因为打印不出来这么多
    let searchSqlParams = params.concat([(page - 1) * pageSize, pageSize])//分页 每页有多少 

    //查询数据总数
    let searchCountSql = " SELECT count(*) AS `count` FROM `blog` " + whereSqlStr;
    let searchCountParams = params

    //分页数据
    let searchResult = await db.async.all(searchSql, searchSqlParams)
    let countResult = await db.async.all(searchCountSql, searchCountParams)

    console.log(searchSql, countResult)

    if (searchResult.err == null && countResult.err == null) {
        res.send({//返回给前端
            code: 200,
            msg: "查询成功",
            data: {
                keyword,
                categoryId,
                page,
                pageSize,
                rows: searchResult.rows,
                count: countResult.rows[0].count
            }
        })

    } else {
        res.send({
            code: 500,
            msg: "查询失败",
        })
    }

})

// 删除接口 /blog/delete?id=xxx
router.delete("/_token/delete", async (req, res) => {//  /_token/delete
    let id = req.query.id
    const delete_sql = "DELETE FROM `blog` WHERE `id` = ?"
    let { err, rows } = await db.async.run(delete_sql, [id])

    if (err == null) {
        res.send({
            code: 200,
            msg: "删除成功"
        })
    } else {
        res.send({
            code: 500,
            msg: "删除失败"
        })
    }

})

//修改博客
router.put("/_token/update", async (req, res) => {//  /_token/update

    let { id, title, categoryId, content } = req.body;
    let create_time = new Date().getTime();

    const update_sql = "UPDATE `blog` SET `title` = ?,`content` = ?,`category_id` = ? WHERE `id` = ?"
    let params = [title, content, categoryId, id]

    let { err, rows } = await db.async.run(update_sql, params)

    if (err == null) {
        res.send({
            code: 200,
            msg: "修改成功"
        })
    } else {
        res.send({
            code: 500,
            msg: "修改失败"
        })
    }

})

//添加博客
router.post("/_token/add", async (req, res) => {//  /_token/add

    let { title, categoryId, content } = req.body;
    let id = genid.NextId();
    let create_time = new Date().getTime();//时间戳

    const insert_sql = "INSERT INTO `blog`(`id`,`title`,`category_id`,`content`,`create_time`) VALUES (?,?,?,?,?)"
    let params = [id, title, categoryId, content, create_time]

    let { err, rows } = await db.async.run(insert_sql, params)//异步执行SQL插入操作

    if (err == null) {
        res.send({
            code: 200,
            msg: "添加成功",
            data: { id: id } //返回创建的文章id给前端
        })
    } else {
        res.send({
            code: 500,
            msg: "添加失败"
        })
    }

})


module.exports = router