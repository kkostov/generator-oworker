var generators = require('yeoman-generator');
var chalk = require('chalk');

module.exports = generators.Base.extend({
  constructor: function () {
    // call super
    generators.Base.apply(this, arguments);

    // default configuration
    this.props = {
      name: this.appname,
      usemssql: false
    };
  },
  initializing: function () {
    console.log(chalk.blue('You are creating a new Worker service'));
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
      }]).then(function (answers) {
        this.appname = answers.name.toLowerCase();
        // update configuration
        this.props.name = this.appname;
        this.props.usemssql = answers.usemssql;
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
    },
    serverFiles: function() {
      this.fs.copy(this.templatePath('src/index.js'), this.destinationPath('src/index.js'));
      this.fs.copyTpl(
        this.templatePath('src/db.js'),
        this.destinationPath('src/db.js'), this.props);
    },
    utilFiles: function() {
      this.fs.copy(this.templatePath('src/lib/util.js'), this.destinationPath('src/lib/util.js'));
    },
    middlewareFiles: function() {
      this.fs.copy(this.templatePath('src/middleware/index.js'), this.destinationPath('src/middleware/index.js'));
    },
    modelFiles: function() {
      // models are db dependant entities so we only add them if mssql was enabled
      if(this.props.usemssql) {
        this.fs.copy(this.templatePath('src/models/user.js'), this.destinationPath('src/models/user.js'));
      }      
    },
    apiFiles: function() {
      this.fs.copy(this.templatePath('src/api/index.js'), this.destinationPath('src/api/index.js'));
    }
  },
  install: {
    addPackages: function() {
      if(this.props.usemssql) {
        console.log(chalk.blue('adding mssql to the solution'));
        this.npmInstall(['mssql'], { 'save': true });
      }
    },
    installAll: function() {
      console.log(chalk.blue('starting npm install'));
      this.npmInstall();
    }
  }
})