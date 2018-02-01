module.exports = class Categories {
    constructor(DATABASE, TABLE, client) {
        this.DATABASE = DATABASE;
        this.TABLE = TABLE;
        this.client = client;
    }
    // 获取可用分类总条数
    getTotalCategoriesNum() {
        return new Promise((resolve, reject) => {
            let sql = `SELECT COUNT(*) FROM (SELECT * FROM ${this.DATABASE}.${this.TABLE} where enabled=1) as t`;
            this.client.query(sql, function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        })
    }
    // 获取分类(可用分类)
    getCategories(offset = 0, size = 100) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM ${this.DATABASE}.${this.TABLE} where enabled=1 ORDER BY create_time DESC limit ${offset},${size}`;
            this.client.query(sql, function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        })
    }
    // 新增分类
    addCategories(categoriesName) {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO ${this.DATABASE}.${this.TABLE} (name, create_time, enabled) VALUES (?, ?, ?);`;
            let params = [categoriesName, +new Date(), 1];
            this.client.query(sql, params, function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        })
    }
    // 禁用分类
    disableCategories(categoriesId) {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE ${this.DATABASE}.${this.TABLE} SET enabled='0' WHERE id=${categoriesId};`;
            this.client.query(sql, function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        })
    }
    // 修改分类
    modifyCategories(categoriesId, categoriesName) {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE ${this.DATABASE}.${this.TABLE} SET name='${categoriesName}', modify_time= ${+new Date()} WHERE id=${categoriesId};`;
            this.client.query(sql, function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        })
    }
    // 查找分类
    queryCategories(categoriesId) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM  ${this.DATABASE}.${this.TABLE} WHERE id=${categoriesId};`;
            this.client.query(sql, function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        })
    }
}