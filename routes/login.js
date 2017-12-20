const router = require('koa-router')()
const userSign = require('../sql/user-data')
const jwt = require('../middleware/jwt')

router.prefix('/api')
// 登录
router.post('/login', async(ctx, next) => {
    let reqInfo = ctx.request.body;
    let resInfo;
    await userSign.login(reqInfo).then(res => {
            if (res.length !== 0) {
                resInfo = res;
                return jwt.jwtSign(res[0].id);
            }
            ctx.throw(406, 'LoginErr');
        }, err => {
            ctx.throw(500, 'UnknowError');
        })
        .then(token => {
            if (!!resInfo && !!resInfo[0]) {
                ctx.body = { ...resInfo[0],
                    token: token
                };
            }
        }, err => {
            ctx.throw(500, 'UnknowError');
        })
})
// 注册
router.post('/register', async(ctx, next) => {
    let info = ctx.request.body;
    await userSign.register(info).then(res => {
        ctx.body = {
            id: res.insertId
        };
    }, err => {
        // 用户名重复
        if (err.code === 'ER_DUP_ENTRY') {
            ctx.throw(406, 'IsRegisted');
            return;
        }
        ctx.throw(500, 'UnknowError');
    })
})
// 修改密码
router.post('/modifyPassword/:id', async(ctx, next) => {
    let id = ctx.params.id;
    let info = ctx.request.body;
    await userSign.verifyPassword({
            id: id,
            password: info.password
        }).then(res => {
            if (res.length !== 0) {
                resInfo = res;
                return userSign.modifyPassword({
                    id: id,
                    password: info.newPassword
                });
            }
            ctx.throw(401, 'VerifyErr');
            return;
        }, err => {
            ctx.throw(500, 'UnknowError');
        })
        .then(res => {
            ctx.body = {
                message: "OK"
            }
        }, err => {
            ctx.throw(500, 'UnknowError');
        })
})
// 获取用户列表
router.get('/userList', async(ctx, next) => {
    let headers = ctx.request.headers;
    let data;
    await userSign.getUserList(headers.offset, headers.size).then(res => {
        data = res;
        return userSign.getTotalUserNum();
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
module.exports = router