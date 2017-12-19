const router = require('koa-router')()
const reviewsData = require('../sql/reviews-data')

router.prefix('/api')
// 通过文章id获取评论列表
router.get('/reviews/articles/:articlesId', async(ctx, next) => {
    let articlesId = ctx.params.articlesId;
    let headers = ctx.request.headers;
    let data;
    await reviewsData.getReviewsList(articlesId, headers.offset, headers.size).then(res => {
        data = res;
        return reviewsData.getTotalReviewsNum(articlesId);
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
// 发表评论
router.post('/reviews', async(ctx, next) => {
    let info = ctx.request.body;
    await reviewsData.addReviews(info).then(res => {
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
// 删除评论
router.delete('/reviews/:id', async(ctx, next) => {
    let id = ctx.params.id;
    await reviewsData.deleteReviews(id).then(res => {
        if (res['changedRows'] === 1) {
            ctx.status = 200;
        } else {
            ctx.body = 'DeleteError';
        }
    }, err => {
        ctx.status = 500;
    })
})
module.exports = router