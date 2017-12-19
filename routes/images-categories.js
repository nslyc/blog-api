const koaRouter = require('koa-router')
const imagesCategories = require('../sql/images-categories')
const CategoriesRouter = require('./categories.js')
const router = new CategoriesRouter(koaRouter(), '/api/image', imagesCategories).router
module.exports = router