var mysql = require('mysql');
var DATABASE = 'blog';
var TABLE = 'articles';

//创建连接 
var client = mysql.createConnection({
    user: 'root',
    password: '123456',
    database: DATABASE
});
client.connect();
// 获取文章列表
exports.getArticlesList = () => {
    return new Promise((resolve, reject) => {
        let sql = ``;
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 获取文章总数
exports.getTotalArticlesNum = () => {
    return new Promise((resolve, reject) => {
        let sql = ``;
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 新增文章
exports.addArticles = (articlesData) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO ${DATABASE}.${TABLE} (title, type, author, content, create_time, categories_id) VALUES (?, ?, ?, ?, ?, ?);`;
        let params = [`${articlesData.title}`, `${articlesData.type}`, `${articlesData.author}`, `${articlesData.content}`, +new Date(), `${articlesData.categoriesId}`,];
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 删除文章
exports.deleteArticles = () => {
    return new Promise((resolve, reject) => {
        let sql = ``;
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 修改文章
exports.modifyArticles = () => {
    return new Promise((resolve, reject) => {
        let sql = ``;
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 查找文章
exports.queryArticles = () => {
    return new Promise((resolve, reject) => {
        let sql = ``;
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}