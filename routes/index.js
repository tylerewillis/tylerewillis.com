const express = require('express')
const helmet = require('helmet')
const app = express()
app.use(helmet())
const router = express.Router()
const nodemailer = require("nodemailer")
const fs = require('fs')
const date = require('date-mirror')

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

// Home
router.get('/', (req, res) => {

  // Get pages from file
  var json = fs.readFileSync('./includes/pages.json')
  let pages = JSON.parse(json)
  let featuredPages = pages.slice(0,5)

  // Get projects from file
  json = fs.readFileSync('./includes/projects.json')
  let projects = JSON.parse(json)

  // Render page
  var args = { pages: featuredPages, projects }
  res.render('index', args)
})

//===============================================
//= getPages Middleware
//===============================================

var getPages = (req,res,next) => {
  // Get pages from file
  var json = fs.readFileSync('./includes/pages.json')
  let pages = JSON.parse(json)

  // Get keywords and counts
  var keywords = []
  for (i = 0; i < pages.length; i++) {
    if (pages[i].keywords) {
      for (j = 0; j < pages[i].keywords.length; j++) {
        if (!keywords.includes(pages[i].keywords[j])) {
          keywords.push(pages[i].keywords[j])
        }
      }
    }
  }

  req.args = { pages, keywords }
  next()
}

//===============================================
//= Pages
//===============================================

router.get('/pages', getPages, (req, res) => {
  res.render('pages', req.args)
})

//===============================================
//= Pages with keyword
//===============================================

router.get('/pages/:keyword', getPages, (req, res) => {
  req.args.init = req.params.keyword
  res.render('pages', req.args)
})

//===============================================
//= getProjects Middleware
//===============================================

var getProjects = (req,res,next) => {
  // Get pages from file
  var json = fs.readFileSync('./includes/projects.json')
  let projects = JSON.parse(json)

  req.args = { projects }
  next()
}

//===============================================
//= Pages
//===============================================

router.get('/projects', getProjects, (req, res) => {
  res.render('projects', req.args)
})

//===============================================
//= Privacy
//===============================================

router.get('/privacy', (req, res) => {
  res.render('privacy-policy', req.args)
})

// Enable CORS Pre-Flight
const cors = require('cors')
router.options('*', cors())

// Global middleware
router.get('*', (req, res, next) => {
  const origin = (req.headers.origin == 'http://localhost:3000') ? 'http://localhost:3000' : 'WEBSITE'
  res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

//===============================================
//= Test JS Script validation
//===============================================

router.get('/user/:id/:site', (req, res) => {
  if (req.params.id === '12345' && req.params.site === 'localhost') {
    res.send({
      success: true
    })
  } else {
    res.send({
      success: false
    })
  }
})

module.exports = router