var generators = require('yeoman-generator');
var glob = require("glob");

module.exports = generators.Base.extend({
  constructor: function () {
    // call super
    generators.Base.apply(this, arguments);

    //this.option('coffee');  adds support for a --coffee flag
  },
  prompting: {
    questions: function () {
      return this.prompt([{
        type: 'input',
        name: 'name',
        message: 'What is the name of the worker project?',
        default: this.props.appname,
      }]).then(function (answers) {
        this.props.appname = answers.name;
      }.bind(this));
    }
  },
  writing: {
    configfiles: function () {
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'), {
          projectName: this.props.appname.toLowerCase()
        });
      this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
    },
    projectFiles: function () {
      var files = glob.sync(this.sourceRoot() + '/**/*');
      var ignores = [
        '.git',
        'LICENSE',
        'README.md',
      ];
      files.forEach(function (file) {
        if (ignores.indexOf(file) !== -1) {
          return;
        }
        this.copy(file, file);
      }, this);
    }
  }
})