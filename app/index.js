var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    // call super
    generators.Base.apply(this, arguments);

    //this.option('coffee');  adds support for a --coffee flag
  },
  method1: function () {
    console.log('method 1 executed');
    
  }
});