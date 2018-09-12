const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
    if (ctx.url === '/' && ctx.method === 'GET') {
        // GET
        let html = `
            <h1>Koa2 request post demo</h1>
            <form method="POST"  action="/">
                <p>userName</p>
                <input name="userName" /> <br/>
                <p>age</p>
                <input name="age" /> <br/>
                <p>webSite</p>
                <input name='webSite' /><br/>
                <button type="submit">submit</button>
            </form>
        `;
        ctx.body = html;
    } else if (ctx.url === '/' && ctx.method === 'POST') {
        // POST
        let postData = await parsePostData(ctx)
        ctx.body = postData
    } else {
        // 其他请求
        ctx.body = '404'
    }
})

app.listen(3000)

// 获取post参数
function parsePostData(ctx) {
    return new Promise((resolve,reject) => {
        try {
            let postdata = ''
            ctx.req.on('data', data => {
                postdata += data
            })
            ctx.req.addListener('end', ()=> {
                postdata = parseQueryStr(postdata)
                resolve(postdata)
            })
        } catch (err) {
            reject(err)
        }
    })
}
// post参数字符串转JSON
function parseQueryStr(queryStr){
    let queryData={};
    let queryStrList = queryStr.split('&');
    for( let [index,queryStr] of queryStrList.entries() ){
        let itemList = queryStr.split('=');
        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    } 
    return queryData
}