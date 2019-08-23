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

router.get('/binary-max-heap', (req, res) => {

  // Render page
  var args = { url: '/page/binary-max-heap' }
  res.render('pages/binary-max-heap', args)
})

//================================================
// Binary Heap Algorithm
//================================================

router.get('/heap-sort-javascript', (req, res) => {

  // Render page
  var args = { url: '/page/heap-sort-javascript' }
  res.render('pages/heap-sort-javascript', args)
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

//================================================
// Binary Tree Implementation
//================================================

router.get('/binary-tree-javascript', (req, res) => {

  // Render page
  var args = { url: '/page/binary-tree-javascript' }
  res.render('pages/binary-tree-implementation', args)
})

//================================================
// Linked Lists
//================================================

router.get('/linked-lists', (req, res) => {

  // Render page
  var args = { url: '/page/linked-lists' }
  res.render('pages/linked-list', args)
})

//================================================
// Hash Table with Linear Probing
//================================================

router.get('/hash-table-linear-probing', (req, res) => {

  // Render page
  var args = { url: '/page/hash-table-linear-probing' }
  res.render('pages/hash-table-linear-probing', args)
})

//================================================
// Distributed Hash Table
//================================================

router.get('/distributed-hash-table', (req, res) => {

  // Render page
  var args = { url: '/page/distributed-hash-table' }
  res.render('pages/distributed-hash-table', args)
})

//================================================
// Binary Search with Array
//================================================

router.get('/binary-search-array', (req, res) => {

  // Render page
  var args = { url: '/page/binary-search-array' }
  res.render('pages/binary-search-array', args)
})

//================================================
// Depth-First Traversal Orders
//================================================

router.get('/depth-first-traversal-orders', (req, res) => {

  // Render page
  var args = { url: '/page/depth-first-traversal-orders' }
  res.render('pages/depth-first-traversal-orders', args)
})

//================================================
// Is Binary Search Tree
//================================================

router.get('/is-binary-search-tree', (req, res) => {

  // Render page
  var args = { url: '/page/is-binary-search-tree' }
  res.render('pages/is-binary-search-tree', args)
})

//================================================
// Get Successor in Binary Search Tree
//================================================

router.get('/binary-search-tree-successor', (req, res) => {

  // Render page
  var args = { url: '/page/binary-search-tree-successor' }
  res.render('pages/binary-search-tree-successor', args)
})

//================================================
// Merge Sort Algorithm
//================================================

router.get('/merge-sort-javascript', (req, res) => {

  // Render page
  var args = { url: '/page/merge-sort-javascript' }
  res.render('pages/merge-sort-javascript', args)
})

//================================================
// Radix Sort Algorithm
//================================================

router.get('/radix-sort-javascript', (req, res) => {

  // Render page
  var args = { url: '/page/radix-sort-javascript' }
  res.render('pages/radix-sort-javascript', args)
})

//================================================
// Selection Sort Algorithm
//================================================

router.get('/selection-sort-javascript', (req, res) => {

  // Render page
  var args = { url: '/page/selection-sort-javascript' }
  res.render('pages/selection-sort-javascript', args)
})

//================================================
// Shell Sort Algorithm
//================================================

router.get('/shell-sort-javascript', (req, res) => {

  // Render page
  var args = { url: '/page/shell-sort-javascript' }
  res.render('pages/shell-sort-javascript', args)
})

//================================================
// Bubble Sort Algorithm
//================================================

router.get('/bubble-sort-javascript', (req, res) => {

  // Render page
  var args = { url: '/page/bubble-sort-javascript' }
  res.render('pages/bubble-sort-javascript', args)
})

//================================================
// Insertion Sort Algorithm
//================================================

router.get('/insertion-sort-javascript', (req, res) => {

  // Render page
  var args = { url: '/page/insertion-sort-javascript' }
  res.render('pages/insertion-sort-javascript', args)
})

//================================================
// Quick Sort Algorithm
//================================================

router.get('/quick-sort-javascript', (req, res) => {

  // Render page
  var args = { url: '/page/quick-sort-javascript' }
  res.render('pages/quick-sort-javascript', args)
})

module.exports = router