const router = require('koa-router')()
const articlesData = require('../sql/articles-data')

router.prefix('/api')
// 获取文章列表
router.get('/articles', async(ctx, next) => {
    let headers = ctx.request.headers;
    let data;
    await articlesData.getArticlesList(headers.offset, headers.size).then(res => {
        data = res;
        return articlesData.getTotalArticlesNum();
    }, err => {
        ctx.throw(500, 'UnknowError');
    }).then(res => {
        let totalNum = 0;
        if (!!res) {
            totalNum = res[0]['COUNT(*)'];
        }
        ctx.body = {
            list: data,
            totalNum: totalNum
        }
    }, err => {
        ctx.throw(500, 'UnknowError');
    })
})
// 获取分类下的文章列表
router.get('/articles/categories/:categoriesId', async(ctx, next) => {
    let categoriesId = ctx.params.categoriesId;
    let headers = ctx.request.headers;
    let data;
    await articlesData.getArticlesListByCategoriesId(categoriesId, headers.offset, headers.size).then(res => {
        data = res;
        return articlesData.getTotalArticlesNumByCategoriesId(categoriesId);
    }, err => {
        ctx.throw(500, 'UnknowError');
        console.log(err);
    }).then(res => {
        let totalNum = 0;
        if (!!res) {
            totalNum = res[0]['COUNT(*)'];
        }
        ctx.body = {
            list: data,
            totalNum: totalNum
        }
    }, err => {
        ctx.throw(500, 'UnknowError');
        console.log(err);
    })
})
// 新增文章
router.post('/articles', async(ctx, next) => {
    let info = ctx.request.body;
    await articlesData.addArticles(info).then(res => {
        ctx.body = {
            id: res['insertId']
        }
    }, err => {
        // 用户名重复
        if (err.code === 'ER_DUP_ENTRY') {
            ctx.throw(406, 'IsCreated');
            return;
        }
        console.log(err);
        ctx.throw(500, 'UnknowError');
    })
})
// 删除文章
router.delete('/articles/:id', async(ctx, next) => {
    let id = ctx.params.id;
    await articlesData.deleteArticles(id).then(res => {
        if (res['changedRows'] === 1) {
            ctx.body = {
                message: 'OK'
            };
        } else {
            ctx.throw(406, 'DeleteError');
        }
    }, err => {
        ctx.throw(500, 'UnknowError');
    })
})
// 修改文章
router.post('/articles/:id', async(ctx, next) => {
    let id = ctx.params.id;
    let info = ctx.request.body;
    await articlesData.modifyArticles({ ...info,
        id: id
    }).then(res => {
        if (res['changedRows'] === 1) {
            ctx.body = {
                message: 'OK'
            };
        } else {
            ctx.throw(406, 'ModifyError');
        }
    }, err => {
        ctx.throw(500, 'UnknowError');
        console.log(err);
    })
})
// 查找文章
router.get('/articles/:id', async(ctx, next) => {
    let id = ctx.params.id;
    await articlesData.queryArticles(id).then(res => {
        ctx.body = res;
    }, err => {
        ctx.throw(500, 'UnknowError');
    })
})

module.exports = router