var mysql = require('mysql');
var DATABASE = 'blog';
var TABLE = 'leaves';

//创建连接 
var client = mysql.createConnection({
    user: 'root',
    password: '123456',
    database: DATABASE
});
client.connect();
// 获取留言列表(管理员)
exports.getLeavesListByAdmin = (offset = 0, size = 100) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${DATABASE}.${TABLE} WHERE enabled= 1 ORDER BY create_time DESC limit ${offset},${size}`;
        client.query(sql, (err, res, fields) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 获取留言列表
exports.getLeavesList = (offset = 0, size = 100) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT name, content, create_time, site FROM ${DATABASE}.${TABLE} WHERE enabled= 1 ORDER BY create_time DESC limit ${offset},${size}`;
        client.query(sql, (err, res, fields) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 获取留言总条数
exports.getTotalLeavesNum = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT COUNT(*) FROM (SELECT * FROM ${DATABASE}.${TABLE} WHERE enabled= 1) as t`;
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 发表留言
exports.addLeaves = (leavesData) => {
    let site = leavesData.site || '';
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO ${TABLE} (name, email, site, content, article_id, create_time) VALUES (?, ?, ?, ?, ?, ?)`;
        let params = [leavesData.name, leavesData.email, site, leavesData.content, leavesData.articleId, +new Date()];
        client.query(sql, params, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 删除留言
exports.deleteLeaves = (id) => {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE ${DATABASE}.${TABLE} SET enabled=0 WHERE id=${id};`;
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}