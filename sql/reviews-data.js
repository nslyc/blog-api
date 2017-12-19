var mysql = require('mysql');
var DATABASE = 'blog';
var TABLE = 'reviews';

//创建连接 
var client = mysql.createConnection({
    user: 'root',
    password: '123456',
    database: DATABASE
});
client.connect();
// 获取指定文章的评论列表(管理员)
exports.getReviewsListByAdmin = (articleId, offset = 0, size = 100) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${DATABASE}.${TABLE} WHERE article_id= ${articleId} AND enabled= 1 ORDER BY create_time DESC limit ${offset},${size}`;
        client.query(sql, (err, res, fields) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 获取指定文章的评论列表
exports.getReviewsList = (articleId, offset = 0, size = 100) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT author, content, create_time FROM ${DATABASE}.${TABLE} WHERE article_id= ${articleId} AND enabled= 1 ORDER BY create_time DESC limit ${offset},${size}`;
        client.query(sql, (err, res, fields) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 获取文章评论总条数
exports.getTotalReviewsNum = (articleId) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT COUNT(*) FROM (SELECT * FROM ${DATABASE}.${TABLE} WHERE article_id= ${articleId} AND enabled= 1) as t`;
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 发表评论
exports.addReviews = (reviewsData) => {
    let site = reviewsData.site || '';
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO ${TABLE} (author, email, site, content, article_id, create_time) VALUES (?, ?, ?, ?, ?, ?)`;
        let params = [reviewsData.author, reviewsData.email, site, reviewsData.content, reviewsData.articleId, +new Date()];
        client.query(sql, params, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 删除评论
exports.deleteReviews = (id) => {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE ${DATABASE}.${TABLE} SET enabled=0 WHERE  id=${id};`;
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}