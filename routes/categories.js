const router = require('koa-router')()
const categoriesData = require('../sql/categories-data')

router.prefix('/api')

// 新增分类
router.post('/categories', async(ctx, next) => {
    let info = ctx.request.body;
    await categoriesData.addCategories(info.name).then(res => {
        ctx.body = {
            id: res['insertId']
        }
    }, err => {
        // 用户名重复
        if (err.code === 'ER_DUP_ENTRY') {
            ctx.status = 406;
            ctx.message = 'IsCreated';
            return;
        }
        ctx.body = 'CreateError';
        ctx.status = 415;
    })
})
// 删除分类(禁用)
router.delete('/categories/:id', async(ctx, next) => {
    let id = ctx.params.id;
    await categoriesData.disableCategories(id).then(res => {
        if (res['changedRows'] === 1) {
            ctx.status = 200;
        } else {
            ctx.body = 'DeleteError';
        }
    }, err => {
        ctx.status = 500;
    })
})
// 修改分类
router.post('/categories/:id', async(ctx, next) => {
    let id = ctx.params.id;
    let name = ctx.request.body['name'];
    await categoriesData.modifyCategories(id, name).then(res => {
        if (res['changedRows'] === 1) {
            ctx.status = 200;
        } else {
            ctx.body = 'ModifyError';
        }
    }, err => {
        ctx.status = 500;
    })
})
// 查找分类
router.get('/categories/:id', async(ctx, next) => {
    let id = ctx.params.id;
})
// 获取分类列表
router.get('/categories', async(ctx, next) => {
    let headers = ctx.request.headers;
    let data;
    await categoriesData.getCategories(headers.offset, headers.size).then(res => {
        data = res;
        return categoriesData.getTotalCategoriesNum();
    }, err => {
        ctx.status = 500;
    }).then(res => {
        ctx.body = {
            list: data,
            totalNum: res[0]['COUNT(*)']
        }
    }, err => {
        ctx.status = 500;
    })
})

module.exports = router