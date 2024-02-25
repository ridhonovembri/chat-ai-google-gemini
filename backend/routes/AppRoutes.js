const express = require('express')
const route = express.Router()
const gemini = require('../controllers/index')

route.post('/api/response', gemini.generateResponse)
route.post('/api/chat', gemini.generateChat)

module.exports = route