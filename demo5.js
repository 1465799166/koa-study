const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()

let home = new Router()
home.get('/', async(ctx) => {
    ctx.body = {
        name: 'haha'
    }
    // ctx.response.body = {
    //     name: 'haha'
    // }
}).get('/todo', async(ctx) => {
    ctx.body = 'home-todo'
})

let user = new Router()
user.get('/', async(ctx) => {
    ctx.body = 'user-index'
}).get('/todo', async(ctx) => {
    ctx.body = 'user-todo'
})

let router = new Router()
router.use('/home', home.routes(), home.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000,() => {
    console.log('starting at port 3000')
})