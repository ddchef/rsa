const Koa = require('koa')
const koaBody = require('koa-bodyparser')
const Router = require('koa-router')
const static = require('koa-static')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const app = new Koa()
const router = new Router()
const privateKey = fs.readFileSync('./key/rsa_private.key')
const publicKey = fs.readFileSync('./key/rsa_public.key')
const staticPath = './static'
app.use(koaBody())
app.use(static(path.join(__dirname,staticPath)))
router.get('/public',async (ctx,next)=>{
  ctx.response.body = {public:publicKey.toString('utf8')}
})
router.post('/login', async (ctx,next) => {
  let {
    password
  } = ctx.request.body
  try {
    const str = crypto.privateDecrypt({key:privateKey,padding:crypto.constants.RSA_PKCS1_PADDING},Buffer.from(password,'base64')).toString('utf8')
    ctx.response.body = {code:200,text:str}
  } catch (error) {
    ctx.response.body={code:404,msg:'解密失败'}
  }
})
app.use(router.routes())
  .use(router.allowedMethods)
app.listen(3000,()=>{
  console.log('starting 3000')
})