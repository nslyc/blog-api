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
router.post('/modifyPassword/:id', async(ctx, next) => {
    let id = ctx.params.id;
    let info = ctx.request.body;
    await userSign.modifyPassword({
        id: id,
        password: info.password
    }).then(res => {
        ctx.body = 'OK';
    }, err => {
        ctx.body = 'ModifyError';
        ctx.status = 415;
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
        ctx.body = 'UnknowError';
        ctx.status = 415;
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
        ctx.body = 'UnknowError';
        ctx.status = 415;
    })
})
module.exports = router