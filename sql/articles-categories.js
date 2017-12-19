var mysql = require('mysql');
const Categories = require('./categories');
var DATABASE = 'blog';
var TABLE = 'articles_categories';

//创建连接 
var client = mysql.createConnection({
    user: 'root',
    password: '123456',
    database: DATABASE
});
client.connect();
module.exports = new Categories(DATABASE, TABLE, client);