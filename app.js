const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors')

const routes = require('./routes/config')
const verifyToken = require('./middleware/verify-token')

// error handler
onerror(app)
app.use(cors())

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

app.use(verifyToken())
// logger
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(routes.login.routes(), routes.login.allowedMethods())
app.use(routes.upload.routes(), routes.upload.allowedMethods())
app.use(routes.categories.routes(), routes.categories.allowedMethods())
app.use(routes.articles.routes(), routes.articles.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

console.log('开始了~~~')
module.exports = app