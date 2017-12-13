const jwt = require('jsonwebtoken')

// 生成token
exports.jwtSign = (id) => {
    return new Promise((resolve, reject) => {
        jwt.sign({
            id: id
        }, 'secret', {
            expiresIn: '1h'
        }, function (err, token) {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    })
}
// 验证token
exports.jwtVerify = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'secret', function (err, decoded) {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    })
}