const koaRouter = require('koa-router')
const articlesCategories = require('../sql/articles-categories')
const CategoriesRouter = require('./categories.js')
const router = new CategoriesRouter(koaRouter(), '/api/article', articlesCategories).router
module.exports = router