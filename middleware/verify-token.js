const jwt = require('./jwt')
// 验证token的中间件
module.exports = () => {
    return async(ctx, next) => {
        let url = ctx.url;
        if (url.match(/\/api\/upload/)) {
            let token = ctx.header.authorization;
            if (!token) {
                ctx.body = 'Unauthorized';
                ctx.status = 401;
                return;
            }
            await jwt.jwtVerify(token).then(res => {
                return next();
            }, err => {
                ctx.body = err.name;
                ctx.status = 403;
            })
        } else {
            return next();
        }
    }
}