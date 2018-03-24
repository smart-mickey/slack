'use strict';

var express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  compress = require('compression'),
  methodOverride = require('method-override'),
  helmet = require('helmet'),
  cors = require('cors');

module.exports.initMiddleware = function (app) {
  app.use(compress({
    filter: function (req, res) {
      return (/json|text/).test(res.getHeader('Content-Type'));
    },
    level: 9,
  }));

  app.use(morgan('dev'));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(methodOverride());
};

module.exports.initHelmetHeaders = function (app) {
  var SIX_MONTHS = 15778476;

  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.use(helmet.hsts({
    maxAge: SIX_MONTHS,
    includeSuddomains: true,
    force: true,
  }));
  app.disable('x-powered-by');
};

module.exports.initCORS = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization');
    if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });
};

module.exports.initMoudlesServerRoutes = function (app) {
  require('../../routes/index')(app);
};

module.exports.init = function () {
  var app = express();
  this.initMiddleware(app);
  this.initHelmetHeaders(app);
  this.initHelmetHeaders(app);
  this.initCORS(app);
  this.initMoudlesServerRoutes(app);

  return app;
};
