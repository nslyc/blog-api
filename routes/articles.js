const router = require('koa-router')()

router.prefix('/api')
// 获取文章列表
router.get('/articles', function (ctx, next) {
    ctx.body = '获取文章列表'
})
// 新增文章
router.post('/articles', function (ctx, next) {
    ctx.body = '新增文章'
})
// 删除文章
router.delete('/articles', function (ctx, next) {
    ctx.body = '删除文章'
})
// 修改文章
router.post('/articles/:id', function (ctx, next) {
    ctx.body = '修改文章'
})
// 查找文章
router.get('/articles/:id', function (ctx, next) {
    ctx.body = '查找文章'
})

module.exports = router