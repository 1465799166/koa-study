const Koa = require('koa')
const app = new Koa()

const main = async ctx => {
    ctx.body = 'hello koa2'
}

app.use(main)
app.listen(3000)