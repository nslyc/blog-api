var mysql = require('mysql');
var DATABASE = 'blog';
var TABLE = 'user_data';

//创建连接 
var client = mysql.createConnection({
    user: 'root',
    password: '123456',
    database: DATABASE
});
client.connect();
// 注册
exports.register = (userData) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO ${TABLE} (username, password, create_time) VALUES (?, ?, ?)`;
        let params = [`${userData.username}`, `${userData.password}`, +new Date()];
        client.query(sql, params, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 登录
exports.login = (userData) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT id FROM ${TABLE} WHERE username = '${userData.username}' AND password = '${userData.password}'`;
        client.query(sql, (err, res, fields) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 查找用户id(通过用户名)
exports.getUserId = (name) => {
    return new Promise((resolve, reject) => {
        let sql = `select id from ${TABLE} where username = '${name}'`;
        client.query(sql, (err, res, fields) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 修改密码
exports.modifyPassword = (userData) => {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE ${DATABASE}.${TABLE} SET password=${userData.password}, modify_time= ${+new Date()} WHERE id=${userData.id}`;
        client.query(sql, (err, res, fields) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}