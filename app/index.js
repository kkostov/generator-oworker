var generators = require('yeoman-generator');
var chalk = require('chalk');
var clean = require('gulp-clean');


module.exports = generators.Base.extend({
  constructor: function () {
    // call super
    generators.Base.apply(this, arguments);

    // default configuration
    this.props = {
      name: this.appname,
      usemssql: false,
      usedocker: false
    };
  },
  initializing: function () {
    // check current project state and get configs
  },
  prompting: {
    questions: function () {
      return this.prompt([{
        type: 'input',
        name: 'name',
        message: 'What is the name of the worker project?',
        default: this.appname,
      }, {
          type: 'confirm',
          name: 'usemssql',
          message: 'Would you like to enable support for MS SQL?',
          default: true,
        }, {
          type: 'confirm',
          name: 'usedocker',
          message: 'Would you like to add a docker container for local development?',
          default: true,
        }]).then(function (answers) {
          this.appname = answers.name.toLowerCase().replace(' ', '-');
          // update configuration
          this.props.name = this.appname;
          this.props.usemssql = answers.usemssql;
          this.props.usedocker = answers.usedocker;
        }.bind(this));
    }
  },
  writing: {
    configFiles: function () {
      // transform the package.json
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), this.props);

      // gitignore
      this.fs.copy(this.templatePath('_.gitignore'), this.destinationPath('.gitignore'));

      // app settings
      this.fs.copy(this.templatePath('src/config.json'), this.destinationPath('src/config.json'));

      if (this.props.usedocker) {
        // docker compose
        this.fs.copy(this.templatePath('docker-compose.yml'), this.destinationPath('docker-compose.yml'));
      }
    },
    serverFiles: function () {
      this.fs.copy(this.templatePath('src/index.js'), this.destinationPath('src/index.js'));
      this.fs.copyTpl(
        this.templatePath('src/db.js'),
        this.destinationPath('src/db.js'), this.props);
    },
    utilFiles: function () {
      this.fs.copy(this.templatePath('src/lib/util.js'), this.destinationPath('src/lib/util.js'));
    },
    middlewareFiles: function () {
      this.fs.copy(this.templatePath('src/middleware/index.js'), this.destinationPath('src/middleware/index.js'));
      this.fs.copy(this.templatePath('src/middleware/rabbitmq/listener.js'), this.destinationPath('src/middleware/rabbitmq/listener.js'));
    },
    modelFiles: function () {
      // models are db dependant entities so we only add them if mssql was enabled
      if (this.props.usemssql) {
        this.fs.copy(this.templatePath('src/models/user.js'), this.destinationPath('src/models/user.js'));
      }
    },
    apiFiles: function () {
      this.fs.copy(this.templatePath('src/api/index.js'), this.destinationPath('src/api/index.js'));
    }
  },
  install: {
    cleanNodeModules: function () {

    },
    addPackages: function () {
      if (this.props.usemssql) {
        this.npmInstall(['mssql'], { 'save': true });
      }
    },
    installAll: function () {
      this.npmInstall();
    }
  }
})