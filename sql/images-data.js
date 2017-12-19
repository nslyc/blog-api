var mysql = require('mysql');
const Categories = require('./categories');
var DATABASE = 'blog';
var TABLE = 'images';

//创建连接 
var client = mysql.createConnection({
    user: 'root',
    password: '123456',
    database: DATABASE
});
client.connect();
// 增加图片
exports.addImages = (imagesData) => {
    return new Promise((resolve, reject) => {
        let description = imagesData.description || '';
        let sql = `INSERT INTO ${TABLE} (path, description, categories_id, create_time) VALUES (?, ?, ?, ?)`;
        let params = [imagesData.path, description, imagesData.categoriesId, +new Date()];
        client.query(sql, params, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 删除图片(禁用)
exports.deleteImages = (id) => {
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
// 修改图片分类和描述
exports.modifyImages = (id, categoriesId, description) => {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE ${DATABASE}.${TABLE} SET categories_id=${categoriesId}, description= '${description}', modify_time= ${+new Date()} WHERE id=${id};`;
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 获取图片列表(可用图片)
exports.getImagesList = (offset = 0, size = 100) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${DATABASE}.${TABLE} where enabled=1 ORDER BY create_time DESC limit ${offset},${size}`;
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 获取可用图片数量
exports.getTotalImagesNum = () => {
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
// 获取分类下的图片列表(可用图片)
exports.getImagesListByCategoriesId = (categoriesId, offset = 0, size = 100) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${DATABASE}.${TABLE} where categories_id=${categoriesId} ORDER BY create_time DESC limit ${offset},${size}`;
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 获取分类下的可用图片数量
exports.getTotalImagesNumByCategoriesId = (categoriesId) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT COUNT(*) FROM (SELECT * FROM ${DATABASE}.${TABLE} where categories_id=${categoriesId}) as t`;
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}