var generators = require('yeoman-generator');

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
        default: this.appname,
      }]).then(function (answers) {
        this.appname = answers.name;
      }.bind(this));
    }
  },
  writing: {
    packagejson: function () {
      this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), {namespace: this.appname});
    }
  }
})