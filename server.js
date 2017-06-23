/**
 * An example REST proxy service
 * I have this deployed at https://liteiptv-server-ve6uxt1e6hto.runkit.sh/
 */

const LiteIPTV = require('liteiptv').default

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express(exports)

app.use(cors())
app.use(bodyParser.json({extended: true}))

app.get('/', (req, res) => {
  res.status(500).json({error: 'POST here with username/password'})
})

app.post('/', (req, res) => {
  if (!req.body.username) {
    return res.status(500).json({error: 'No username'})
  }
  if (!req.body.password) {
    return res.status(500).json({error: 'No password'})
  }
  const lite = new LiteIPTV(req.body.username, req.body.password)
  lite.panel()
    .then(p => res.json(p))
    .catch(e => res.status(500).json(e))
})

app.listen(process.env.PORT || 8000)
