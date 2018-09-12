const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
    let i = Number(ctx.cookies.get('count') || 0) + 1
    ctx.cookies.set('count', i)
    ctx.body = i
})
app.listen(3000)