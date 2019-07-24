const express = require('express')
const router = express.Router()
const sm = require('sitemap')

sitemap = sm.createSitemap ({
  hostname: 'http://example.com',
  cacheTime: 600000,        // 600 sec - cache purge period
  urls: [
    { url: '',  changefreq: 'daily', priority: 0.3 },
    { url: '/page-2/',  changefreq: 'monthly',  priority: 0.7 },
    { url: '/page-3/'},    // changefreq: 'weekly',  priority: 0.5
    { url: '/page-4/',   img: "http://urlTest.com" }
  ]
});

router.get('/sitemap.xml', function(req, res) {
  sitemap.toXML( function (err, xml) {
      if (err) {
        return res.status(500).end();
      }
      res.header('Content-Type', 'application/xml');
      res.send( xml );
  });
});

module.exports = router;