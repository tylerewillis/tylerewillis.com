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
// Flashcards
//================================================

router.get('/flashcards', (req, res) => {

  // Get flashcards from file
  let json = fs.readFileSync('./includes/flash-cards.json')
  let cards = JSON.parse(json)

  // Render page
  var args = { cards }
  res.render('pages/flashcards', args)
})

//================================================
// Bracket Balance - checking balance strings
//================================================

router.get('/bracket-balance', (req, res) => {

  // Render page
  var args = { }
  res.render('pages/bracket-balance', args)
})

//================================================
// Tree Data Structures
//================================================

router.get('/tree-data-structures', (req, res) => {

  // Render page
  var args = { }
  res.render('pages/tree-structures', args)
})

//================================================
// Network packet processing simulation
//================================================

router.get('/network-packet-processing', (req, res) => {

  // Render page
  var args = { }
  res.render('pages/network-packet-processing-simulation', args)
})

//================================================
// JavaScript Stack
//================================================

router.get('/javascript-stack', (req, res) => {

  // Render page
  var args = { }
  res.render('pages/constant-time-javascript-stack', args)
})

//================================================
// Sliding window
//================================================

router.get('/javascript-sliding-window', (req, res) => {

  // Render page
  var args = { }
  res.render('pages/sliding-window', args)
})

module.exports = router