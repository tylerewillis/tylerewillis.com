const express = require('express')
const helmet = require('helmet')
const app = express()
app.use(helmet())
const router = express.Router()
const nodemailer = require("nodemailer")
const fs = require('fs')

// Express Slow Down
const slowDown = require("express-slow-down")
const defaultLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 5, // allow 5 requests to go at full-speed, then...
  delayMs: 10000 // 6th request has a 10000ms delay
})

// Compression
var compression = require('compression')
app.use(compression())

//================================================
// Bracket Balance - checking balance strings
//================================================

router.get('/from-zero-to-computer-scientist', (req, res) => {
  // Render page
  var args = { url: '/from-zero-to-computer-scientist' }
  res.render('products/zero-to-computer-scientist', args)
})

module.exports = router