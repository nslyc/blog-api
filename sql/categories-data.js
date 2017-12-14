var mysql = require('mysql');
var DATABASE = 'blog';
var TABLE = 'categories';

//创建连接 
var client = mysql.createConnection({
    user: 'root',
    password: '123456',
    database: DATABASE
});
client.connect();
// 获取可用分类总条数
exports.getTotalCategoriesNum = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT COUNT(*) FROM (SELECT * FROM ${DATABASE}.${TABLE} where enabled=1) as t`;
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 获取分类(可用分类)
exports.getCategories = (offset = 0, size = 100) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${DATABASE}.${TABLE} where enabled=1 limit ${offset},${size}`;
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}

// 新增分类
exports.addCategories = (categoriesName) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO ${DATABASE}.${TABLE} (name, create_time, enabled) VALUES (?, ?, ?);`;
        let params = [categoriesName, +new Date(), 1];
        client.query(sql, params, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 禁用分类
exports.disableCategories = (categoriesId) => {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE ${DATABASE}.${TABLE} SET enabled='0' WHERE id=${categoriesId};`;
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 修改分类
exports.modifyCategories = (categoriesId, categoriesName) => {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE ${DATABASE}.${TABLE} SET name='${categoriesName}', modify_time= ${+new Date()} WHERE id=${categoriesId};`;
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}