const multer = require('koa-multer'); //加载koa-multer模块  
const router = require('koa-router')()
const fs = require('fs')
const imagesData = require('../sql/images-data')
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
// // 不分类上传  
router.post('/upload', upload.single('file'), async(ctx, next) => {
    // router.post('/upload', upload.array('file',5), async(ctx, next) => {
    await imagesData.addImages({
        path: `uploads/${ctx.req.file.filename}`,
        description: '富文本编辑器上传图片',
        categoriesId: 0
    }).then(res => {
        ctx.body = {
            link: `${ctx.protocol}://${ctx.host}/uploads/${ctx.req.file.filename}`
        }
    }, err => {
        ctx.throw(500, 'UnknowError');
    })
})
// 分类上传
router.post('/upload/:categoriesId', upload.single('file'), async(ctx, next) => {
    let info = ctx.request.headers;
    let categoriesId = ctx.params.categoriesId;
    await imagesData.addImages({
        path: `uploads/${ctx.req.file.filename}`,
        description: info['description'],
        categoriesId: categoriesId
    }).then(res => {
        ctx.body = {
            fileData: ctx.req.file //返回文件名  
        }
    }, err => {
        ctx.throw(500, 'UnknowError');
    })
})

module.exports = router