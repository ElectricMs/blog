const express = require("express")
const router = express.Router()
const fs = require("fs")
const { db, genid } = require("../db/DbUtils")
//blog使用wangEditorr5 作为写入文本 图片 代码等的工具 https://www.wangeditor.com/
//格式要求:https://www.wangeditor.com/v5/menu-config.html#%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87
router.post("/rich_editor_upload", async (req, res) => {

    if (!req.files) {//不符合要求的文件
        res.send({
            "errno": 1, // 只要不等于 0 就行
            "message": "失败信息"
        })
        return;
    }

    let files = req.files;
    let ret_files = [];

    for (let file of files) {
        //获取文件名字后缀  如aaa.jpg 找到最后一个`.`然后裁取
        let file_ext = file.originalname.substring(file.originalname.lastIndexOf(".") + 1)
        //随机文件名字 雪花算法
        let file_name = genid.NextId() + "." + file_ext

        //修改名字加移动文件
        fs.renameSync(
            process.cwd() + "/public/upload/temp/" + file.filename,
            process.cwd() + "/public/upload/" + file_name
        )
        ret_files.push("/upload/" + file_name)
    }

    res.send({//参考帮助文档的要求写的
        "errno": 0, // 注意：值是数字，不能是字符串
        "data": {
            "url":ret_files[0], // 图片 src ，必须
        }
    })

})


module.exports = router