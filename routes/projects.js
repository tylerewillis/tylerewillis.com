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
  var json = fs.readFileSync('./includes/projects.json')
  let projects = JSON.parse(json)

  var exists = false
  projects.forEach(async function(project) {
    if (project.url == req.params.url) {
      exists = true
      var keywordString = project.keywords.join(', ')
      var args = { title: project.header, description: project.description, keywords: project.keywords, keywordString, url: `/project/${req.params.url}` }
      res.render(`projects/${req.params.url}`, args)
    }
  })
  if (exists == false) {
    res.redirect('/projects')
  }
})

module.exports = router