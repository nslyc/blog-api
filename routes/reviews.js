const router = require('koa-router')()
const reviewsData = require('../sql/reviews-data')

router.prefix('/api')
// 获取评论列表(获取评论全部信息，post 验证token)
router.post('/reviews/list', async (ctx, next) => {
    let headers = ctx.request.headers;
    let data;
    await reviewsData.getReviewsList(headers.offset, headers.size).then(res => {
        data = res;
        return reviewsData.getTotalReviewsNum();
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
    })
})
// 通过文章id获取评论列表
router.get('/reviews/articles/:articlesId', async (ctx, next) => {
    let articlesId = ctx.params.articlesId;
    let headers = ctx.request.headers;
    let data;
    await reviewsData.getReviewsListByArticleId(articlesId, headers.offset, headers.size).then(res => {
        data = res;
        return reviewsData.getTotalReviewsNumByArticleId(articlesId);
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
    })
})
// 发表评论
router.post('/reviews', async (ctx, next) => {
    let info = ctx.request.body;
    await reviewsData.addReviews(info).then(res => {
        ctx.body = {
            id: res['insertId']
        }
    }, err => {
        ctx.throw(500, 'UnknowError');
    })
})
// 删除评论
router.delete('/reviews/:id', async (ctx, next) => {
    let id = ctx.params.id;
    await reviewsData.deleteReviews(id).then(res => {
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
module.exports = router