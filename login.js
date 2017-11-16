const crypto = require('crypto')
const axios = require('axios')
async function login() { 
  const res = await axios.get('http://localhost:3000/public')
  const publicKey = res.data.public
  const password = crypto.publicEncrypt(publicKey,Buffer.from('nishiSB')).toString('hex')
  const success = await axios.post('http://localhost:3000/login',{password:password})
}
login()