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
        let comment = userData.comment || '';
        let sql = `INSERT INTO ${TABLE} (username, password, comment, create_time) VALUES (?, ?, ?, ?)`;
        let params = [userData.username, userData.password, comment, +new Date()];
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
// 查找用户名(通过id)
exports.getUsername = (userId) => {
    return new Promise((resolve, reject) => {
        let sql = `select username from ${TABLE} where id = '${userId}'`;
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
        let sql = `UPDATE ${DATABASE}.${TABLE} SET password='${userData.password}', modify_time= ${+new Date()} WHERE id=${userData.id}`;
        client.query(sql, (err, res, fields) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 获取用户列表
exports.getUserList = (offset = 0, size = 100) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT id, username, comment, create_time FROM ${DATABASE}.${TABLE} ORDER BY create_time DESC limit ${offset},${size}`;
        client.query(sql, (err, res, fields) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 获取用户总数
exports.getTotalUserNum = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT COUNT(*) FROM (SELECT * FROM ${DATABASE}.${TABLE}) as t`;
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}