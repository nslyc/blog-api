const multer = require('koa-multer'); //加载koa-multer模块  
const router = require('koa-router')()
const fs = require('fs')
router.prefix('/api')

//配置  
var storage = multer.diskStorage({
    //文件保存路径  
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    //修改文件名称  
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置  
var upload = multer({
    storage: storage
});
//路由  
router.post('/upload', upload.single('file'), async(ctx, next) => {
    // router.post('/upload', upload.array('file',5), async(ctx, next) => {
    ctx.body = {
        fileData: ctx.req.file //返回文件名  
    }
})

module.exports = router