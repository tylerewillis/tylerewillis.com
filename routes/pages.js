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
// Pages
//================================================

router.get('/:url', (req, res) => {
  // Get pages from file
  var json = fs.readFileSync('./includes/pages.json')
  let pages = JSON.parse(json)

  var exists = false
  pages.forEach(async function(page) {
    if (page.url == req.params.url) {
      exists = true
      var keywordString = page.keywords.join(', ')
      var args = { title: page.header, description: page.description, keywords: page.keywords, keywordString, url: `/page/${req.params.url}` }
      res.render(`pages/${req.params.url}`, args)
    }
  })
  if (exists == false) {
    res.redirect('/pages')
  }
})

module.exports = router