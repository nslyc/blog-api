const router = require('koa-router')()
const leavesData = require('../sql/leaves-data')

router.prefix('/api')
// 获取留言列表(获取评论全部信息，post 验证token)
router.post('/leaves/list', async (ctx, next) => {
    let headers = ctx.request.headers;
    let data;
    await leavesData.getLeavesListByAdmin(headers.offset, headers.size).then(res => {
        data = res;
        return leavesData.getTotalLeavesNum();
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
// 获取留言列表
router.get('/leaves', async (ctx, next) => {
    let headers = ctx.request.headers;
    let data;
    await leavesData.getLeavesList(headers.offset, headers.size).then(res => {
        data = res;
        return leavesData.getTotalLeavesNum();
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
// 发表留言
router.post('/leaves', async (ctx, next) => {
    let info = ctx.request.body;
    await leavesData.addLeaves(info).then(res => {
        ctx.body = {
            id: res['insertId']
        }
    }, err => {
        ctx.throw(500, 'UnknowError');
    })
})
// 删除留言
router.delete('/leaves/:id', async (ctx, next) => {
    let id = ctx.params.id;
    await leavesData.deleteLeaves(id).then(res => {
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