const express = require('express')
const route = express.Router()
const gemini = require('../controllers/index')

route.post('/response', gemini.generateResponse)
route.post('/chat', gemini.generateChat)

module.exports = route