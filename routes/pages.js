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
  var args = { cards, url: '/page/flashcards' }
  res.render('pages/flashcards', args)
})

//================================================
// Bracket Balance - checking balance strings
//================================================

router.get('/bracket-balance', (req, res) => {

  // Render page
  var args = { url: '/page/bracket-balance' }
  res.render('pages/bracket-balance', args)
})

//================================================
// Tree Data Structures
//================================================

router.get('/tree-data-structures', (req, res) => {

  // Render page
  var args = { url: '/page/tree-data-structures' }
  res.render('pages/tree-structures', args)
})

//================================================
// Network packet processing simulation
//================================================

router.get('/network-packet-processing', (req, res) => {

  // Render page
  var args = { url: '/page/network-packet-processing' }
  res.render('pages/network-packet-processing-simulation', args)
})

//================================================
// JavaScript Stack
//================================================

router.get('/javascript-stack', (req, res) => {

  // Render page
  var args = { url: '/page/javascript-stack' }
  res.render('pages/constant-time-javascript-stack', args)
})

//================================================
// Sliding window
//================================================

router.get('/javascript-sliding-window', (req, res) => {

  // Render page
  var args = { url: '/page/javascript-sliding-window' }
  res.render('pages/sliding-window', args)
})

//================================================
// Dynamic Arrays Replication
//================================================

router.get('/dynamic-array-replication', (req, res) => {

  // Render page
  var args = { url: '/page/dynamic-array-replication' }
  res.render('pages/dynamic-array-replication', args)
})

//================================================
// Binary Heap
//================================================

router.get('/binary-heap-implementation', (req, res) => {

  // Render page
  var args = { url: '/page/binary-heap-implementation' }
  res.render('pages/binary-heaps', args)
})

//================================================
// Binary Heap Algorithm
//================================================

router.get('/heap-sort-algorithm', (req, res) => {

  // Render page
  var args = { url: '/page/heap-sort-algorithm' }
  res.render('pages/heap-sort-algorithm', args)
})

//================================================
// Priority Queue Processing Simulation
//================================================

router.get('/priority-queue-processing-simulation', (req, res) => {

  // Render page
  var args = { url: '/page/priority-queue-processing-simulation' }
  res.render('pages/parallel-processing-simulation', args)
})

//================================================
// Direct Addressing
//================================================

router.get('/direct-addressing', (req, res) => {

  // Render page
  var args = { url: '/page/direct-addressing' }
  res.render('pages/direct-addressing', args)
})

//================================================
// Rabin-Karp Substring in String
//================================================

router.get('/rabin-karp-javascript', (req, res) => {

  // Render page
  var args = { url: '/page/rabin-karp-javascript' }
  res.render('pages/rabin-karp', args)
})

module.exports = router