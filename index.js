import * as dotenv from 'dotenv'
import express from 'express'
import line from '@line/bot-sdk'
import config from './config.js'

// ENV Configuration
dotenv.config()

// App Settings
const app = express()
const client = new line.Client(config)

// Routings
app.get('/', function (req, res) {
  res.status(200).send('Chatbot Tutorial')
})

app.post('/event', line.middleware(config), function (req, res) {
  req.body.events.map(event => {
    client.replyMessage(event.replyToken, { type: 'text', text: 'Hello!' }, false)
  })
  res.status(200).send('Chatbot Tutorial')
})

// Process
app.listen(process.env.PORT || 5000)