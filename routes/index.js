const express = require('express')
const helmet = require('helmet')
const app = express()
app.use(helmet())
const router = express.Router()
const nodemailer = require("nodemailer")
const fs = require('fs')

// Include config variables
const config = require('../config/config.js')

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

// Email credentials
let transporter = nodemailer.createTransport({
  host: global.gConfig.emailHost,
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: global.gConfig.emailHostUser,
    pass: global.gConfig.emailHostPassword
  }
});

// MySQL
const mysql = require('mysql');
const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',//domain name
  user            : global.gConfig.dbUser,
  password        : global.gConfig.dbUserPassword,
  database        : global.gConfig.database,
  multipleStatements: true
});

// Home
router.get('/', (req, res) => {
  const home = true

  // Get pages from file
  var json = fs.readFileSync('./includes/pages.json')
  let pages = JSON.parse(json)

  // Get projects from file
  json = fs.readFileSync('./includes/projects.json')
  let projects = JSON.parse(json)

  // Render page
  var args = { pages, projects }
  res.render('index', args)
})

// About
router.get('/about', (req, res) => {
  // Get page meta, alerts and data
  const sql0 = `SELECT * FROM meta WHERE page = 'About'`
  const sql1 = `SELECT * FROM alerts WHERE published = 'on'`
  const sql2 = `SELECT * FROM pages WHERE ID = 4`
  pool.query(`${sql0};${sql1};${sql2}`, function (error, results) {
    // Get page data content
    const content = JSON.parse(results[2][0].content)
    content.forEach((item) => {
      var itemContent = decodeURIComponent(item.content)
      item.content = itemContent
    });
    // Render page
    var args = { meta: results[0][0], alerts: results[1], alertsCookie: req.cookies['alerts'], privacyCookie: req.cookies['privacy'], content }
    res.render('about', args)
  })
})

// Pages
router.get('/pages', (req, res) => {
  // Get pages from file
  var json = fs.readFileSync('./includes/pages.json')
  let pages = JSON.parse(json)

  // Render page
  var args = { pages }
  res.render('pages', args)
})

// Privacy Policy
router.get('/privacy-policy', (req, res) => {
  // Get page data
  const sql0 = `SELECT * FROM meta WHERE page = 'Contact'`
  const sql1 = `SELECT * FROM alerts WHERE published = 'on'`
  const sql2 = `SELECT * FROM pages WHERE ID = 2`
  pool.query(`${sql0};${sql1};${sql2}`, function (error, results) {
    const content = JSON.parse(results[2][0].content)
    content.forEach((item) => {
      var itemContent = decodeURIComponent(item.content)
      item.content = itemContent
    });
    // Render page
    var args = { meta: results[0][0], alerts: results[1], alertsCookie: req.cookies['alerts'], privacyCookie: req.cookies['privacy'], content }
    res.render('privacy-policy', args)
  })
})

module.exports = router