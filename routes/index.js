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

// Home
router.get('/', (req, res) => {

  // Get pages from file
  var json = fs.readFileSync('./includes/pages.json')
  let pages = JSON.parse(json)
  let featuredPages = pages.slice(0,5)

  // Get projects from file
  json = fs.readFileSync('./includes/products.json')
  let products = JSON.parse(json)

  // Render page
  var args = { pages: featuredPages, products }
  res.render('index', args)
})

//===============================================
//= Pages
//===============================================

router.get('/pages', (req, res) => {
  // Get pages from file
  var json = fs.readFileSync('./includes/pages.json')
  let pages = JSON.parse(json)

  // Render page
  var args = { pages }
  res.render('pages', args)
})

//===============================================
//= Pages with keyword
//===============================================

router.get('/pages/:keyword', (req, res) => {
  // Get pages from file
  var json = fs.readFileSync('./includes/pages.json')
  let pages = JSON.parse(json)

  // Render page
  var args = { pages, init: req.params.keyword }
  res.render('pages', args)
})

module.exports = router