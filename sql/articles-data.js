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
exports.getArticlesList = (offset = 0, size = 100) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${DATABASE}.${TABLE} WHERE enabled= 1 ORDER BY create_time DESC limit ${offset},${size}`;
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 获取指定分类下的文章列表
exports.getArticlesListByCategoriesId = (categoriesId, offset = 0, size = 100) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${DATABASE}.${TABLE} WHERE categories_id=${categoriesId} AND enabled= 1 ORDER BY create_time DESC limit ${offset},${size}`;
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
        let sql = `SELECT COUNT(*) FROM (SELECT * FROM ${DATABASE}.${TABLE} WHERE enabled= 1) as t`;
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 获取指定分类下的文章总数
exports.getTotalArticlesNumByCategoriesId = (categoriesId) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT COUNT(*) FROM (SELECT * FROM ${DATABASE}.${TABLE} WHERE categories_id=${categoriesId} AND enabled= 1) as t`;
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
        let sql = `INSERT INTO ${DATABASE}.${TABLE} (title, author, content, description, cover, create_time, categories_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        let description = articlesData.description || '';
        let cover = articlesData.cover || '';
        let params = [articlesData.title, articlesData.author, articlesData.content, description, cover, +new Date(), articlesData.categoriesId];
        client.query(sql, params, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 删除文章
exports.deleteArticles = (id) => {
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
// 修改文章
exports.modifyArticles = (articlesData) => {
    return new Promise((resolve, reject) => {
        let sql;
        if (!!articlesData.cover) {
            sql = `UPDATE ${DATABASE}.${TABLE} SET title='${articlesData.title}', author='${articlesData.author}', content='${articlesData.content}', description='${articlesData.description}', cover='${articlesData.cover}', modify_time=${+new Date()}, categories_id=${articlesData.categoriesId} WHERE  id=${articlesData.id};`;
        }else {
            sql = `UPDATE ${DATABASE}.${TABLE} SET title='${articlesData.title}', author='${articlesData.author}', content='${articlesData.content}', description='${articlesData.description}', modify_time=${+new Date()}, categories_id=${articlesData.categoriesId} WHERE  id=${articlesData.id};`;
        }
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}
// 查找文章
exports.queryArticles = (id) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${DATABASE}.${TABLE} WHERE id=${id} AND enabled= 1;`;
        client.query(sql, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}