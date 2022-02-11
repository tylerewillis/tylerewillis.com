// Clusters
const cluster = require('cluster')
if (cluster.isMaster) {
  var cpuCount = require('os').cpus().length;
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
  cluster.on('exit', function (worker) {
    console.log('Worker %d died :(', worker.id);
    cluster.fork();
  });
} else {
	const express = require('express')
	const app = express()
	
	const helmet = require('helmet')
	app.use(helmet({
		contentSecurityPolicy: {
	    directives: {
	      "frame-ancestors": ["'self'", "https://shuffleinspire.com", "http://localhost:4000"]
	    }
	  }
	}))
	
	const compression = require('compression')
	app.use(compression())
	const port = 3002

	// Base directory
	global.__basedir = __dirname;

	// Body Parser
	const bodyParser = require('body-parser')
	app.use(bodyParser.urlencoded({ extended: false }))

	// Cookie Parser
	const cookieParser = require('cookie-parser')
	app.use(cookieParser())

	// Statis Files
	app.use('/static', express.static('public'))

	// Pug
	app.set('view engine', 'pug')

	// Router
	const mainRoutes = require('./routes')
	const pageRoutes = require('./routes/pages')
	const projectRoutes = require('./routes/projects')
	app.use(mainRoutes)
	app.use('/page', pageRoutes)
	app.use('/project', projectRoutes)

	// 404 Error
  app.all('*', function(req, res) {
    res.redirect("/");
  });

	app.listen(port, () => {
		console.log(`The application is running on port ${port}`);
	})
}