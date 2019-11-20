const express = require('express')
const helmet = require('helmet')
const app = express()
app.use(helmet())
const fs = require('fs')

// Compression
var compression = require('compression')
app.use(compression())


function projectUrls(urls, sitemapXml) {
  // Get projects from file
  json = fs.readFileSync('./includes/projects.json')
  let projects = JSON.parse(json)

  for (let project of projects) {
    urls.push(`https://tylerewillis.com/project/${project.url}`)
    sitemapXml += `<url><loc>https://tylerewillis.com/project/${project.url}</loc></url>`
  }

  pageUrls(urls, sitemapXml)
}

function pageUrls(urls, sitemapXml) {
  // Get pages from file
  var json = fs.readFileSync('./includes/pages.json')
  let pages = JSON.parse(json)

  for (let page of pages) {
    urls.push(`https://tylerewillis.com/page/${page.url}`)
    sitemapXml += `<url><loc>https://tylerewillis.com/page/${page.url}</loc></url>`
  }

  keywordUrls(urls, pages, sitemapXml)
}

function keywordUrls(urls, pages, sitemapXml) {
  for (let page of pages) {
    if (page.keywords) {
      for (let keyword of page.keywords) {
        key = keyword.replace(/ /gm, '%20')
        if (!urls.includes(`https://tylerewillis.com/pages/${key}`)) {
          urls.push(`https://tylerewillis.com/pages/${key}`)
          sitemapXml += `<url><loc>https://tylerewillis.com/pages/${key}</loc></url>`
        }
      }
    }
  }
  createSitemapXml(urls, sitemapXml)
}

function createSitemapXml(urls, sitemapXml) {
  sitemapXml += '</urlset>'
  fs.writeFile('./public/sitemap.xml', sitemapXml, function (err) {
    if (err) return console.log(err);
  })
}

var urls = []
var sitemapXml = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">'
projectUrls(urls, sitemapXml)
console.log(`Updated Sitemap.xml file: ${urls.length} URLs`)