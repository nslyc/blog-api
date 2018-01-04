const jwt = require('./jwt')
// 验证token的中间件
module.exports = () => {
    return async(ctx, next) => {
        let url = ctx.url;
        let method = ctx.method;
        if (method !== 'GET' && url !== '/reviews' && url !== '/login' && url !== '/register') {
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