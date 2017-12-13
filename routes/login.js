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
            ctx.status = 403;
            ctx.message = 'LoginErr';
        }, err => {
            ctx.status = 500;
        })
        .then(token => {
            if (!!resInfo && !!resInfo[0]) {
                ctx.body = { ...resInfo[0],
                    token: token
                };
            }
        }, err => {
            ctx.status = 500;
        })
})
// 注册
router.post('/register', async(ctx, next) => {
    let info = ctx.request.body;
    await userSign.register(info).then(res => {
        ctx.body = {
            id: res.insertId
        };
        ctx.status = 200;

    }, err => {
        // 用户名重复
        if (err.code === 'ER_DUP_ENTRY') {
            ctx.message = 'IsRegisted';
            return;
        }
        ctx.body = 'RegisterError';
        ctx.status = 415;
    })
})
// 修改密码
router.post('/modifyPassword', async(ctx, next) => {
    let info = ctx.request.body;
    await userSign.getUserId(info.username).then(res => {
        if (!!res[0] && !!res[0]['id']) {
            let id = res[0].id;
            return userSign.modifyPassword({
                id: id,
                ...info
            });
        } else {
            ctx.body = 'UserUndefined';
            ctx.status = 406;
        }
    }, err => {
        ctx.body = 'UnknowError';
        ctx.status = 415;
    }).then(res => {
        ctx.status = 200;
    }, err => {
        ctx.body = 'ModifyError';
        ctx.status = 415;
    })
})
module.exports = router