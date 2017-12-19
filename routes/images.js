const router = require('koa-router')()
const imagesData = require('../sql/images-data')

router.prefix('/api')
// 获取图片列表
router.get('/images', async(ctx, next) => {
    let headers = ctx.request.headers;
    let data;
    await imagesData.getImagesList(headers.offset, headers.size).then(res => {
        data = res;
        return imagesData.getTotalImagesNum();
    }, err => {
        ctx.status = 500;
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
        ctx.status = 500;
    })
})
// 获取分类下的图片列表
router.get('/images/categories/:categoriesId', async(ctx, next) => {
    let categoriesId = ctx.params.categoriesId;
    let headers = ctx.request.headers;
    let data;
    await imagesData.getImagesListByCategoriesId(categoriesId, headers.offset, headers.size).then(res => {
        data = res;
        return imagesData.getTotalImagesNumByCategoriesId(categoriesId);
    }, err => {
        ctx.status = 500;
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
        ctx.status = 500;
        console.log(err);
    })
})
// 新增图片
router.post('/images', async(ctx, next) => {
    let info = ctx.request.body;
    await imagesData.addImages(info).then(res => {
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
        console.log(err);
        ctx.body = 'CreateError';
        ctx.status = 415;
    })
})
// 删除图片
router.delete('/images/:id', async(ctx, next) => {
    let id = ctx.params.id;
    await imagesData.deleteImages(id).then(res => {
        if (res['changedRows'] === 1) {
            ctx.status = 200;
        } else {
            ctx.body = 'DeleteError';
        }
    }, err => {
        ctx.status = 500;
    })
})
// 修改图片
router.post('/images/:id', async(ctx, next) => {
    let id = ctx.params.id;
    let info = ctx.request.body;
    await imagesData.modifyImages(id, info['categoriesId'], info['description']).then(res => {
        if (res['changedRows'] === 1) {
            ctx.status = 200;
        } else {
            ctx.body = 'ModifyError';
        }
    }, err => {
        ctx.status = 500;
        console.log(err);
    })
})
module.exports = router