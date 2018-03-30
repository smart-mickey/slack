

let globalConfig = require('../env'),
  express = require('./express'),
  chalk = require('chalk');

module.exports.init = function (callback) {
  const app = express.init();
  if (callback) {
    callback(app, globalConfig);
  }
};

module.exports.start = function (callback) {
  const _this = this;

  _this.init((app, config) => {
    app.listen(config.port, config.host, () => {
      const server = `${(process.env.NODE_ENV === 'secure' ? 'https://' : 'http://') + config.host}:${config.port}`;
      console.log('--');
      console.log(chalk.green('Populous Security Signer'));
      console.log();
      console.log(chalk.green(`Environment:         ${process.env.NODE_ENV}`));
      console.log(chalk.green(`Server:              ${server}`));
      console.log('--');

      if (callback) {
        callback(app, config);
      }
    });
  });
};
