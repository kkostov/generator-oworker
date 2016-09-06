var path = require('path');
var helpers = require('yeoman-test');
var should = require('should');
var assert = require('yeoman-assert');

var defaultPromts = {
  name: 'testappname',
  usemssql: false,
  usedocker: false
}

var withYesPromts = {
  name: 'testappname',
  usemssql: true,
  usedocker: true
}

describe('generator', function () {

  describe('when creating configuration files', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../app')) //.withOptions({ foo: 'bar' })    // Mock options passed in //.withArguments(['name-x'])      // Mock the arguments
        .withPrompts(defaultPromts) // Mock the prompt answers
        .toPromise();
    });

    it('generate a package.json file', function () {
      assert.file(['package.json']);
    });

    it('set name in package.json', function () {
      assert.jsonFileContent('package.json', { name: defaultPromts.name });
    });

    it('generate a .gitignore file', function () {
      assert.file(['.gitignore']);
    });

    it('generate src/config.json', function () {
      assert.file(['src/config.json']);
    });



    describe('when docker is enabled', function () {
      before(function () {
        return helpers.run(path.join(__dirname, '../app')) //.withOptions({ foo: 'bar' })    // Mock options passed in //.withArguments(['name-x'])      // Mock the arguments
          .withPrompts(withYesPromts) // Mock the prompt answers
          .toPromise();
      });

      it('generate docker compose', function () {
        assert.file(['docker-compose.yml']);
      });
    });

    describe('when docker is enabled', function () {
      before(function () {
        return helpers.run(path.join(__dirname, '../app')) //.withOptions({ foo: 'bar' })    // Mock options passed in //.withArguments(['name-x'])      // Mock the arguments
          .withPrompts(defaultPromts) // Mock the prompt answers
          .toPromise();
      });

      it('does not generate docker compose', function () {
        assert.noFile(['docker-compose.yml']);
      });
    });
  });


  describe('when creating server files', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../app')) //.withOptions({ foo: 'bar' })    // Mock options passed in //.withArguments(['name-x'])      // Mock the arguments
        .withPrompts(defaultPromts) // Mock the prompt answers
        .toPromise();
    });

    it('generate a src/index.js file', function () {
      assert.file(['src/index.js']);
    });

    it('generate a src/db.js file', function () {
      assert.file(['src/db.js']);
    });
  });


  describe('when creating util files', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../app')) //.withOptions({ foo: 'bar' })    // Mock options passed in //.withArguments(['name-x'])      // Mock the arguments
        .withPrompts(defaultPromts) // Mock the prompt answers
        .toPromise();
    });

    it('generate a src/lib/util.js file', function () {
      assert.file(['src/lib/util.js']);
    });
  });


  describe('when creating middleware files', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../app')) //.withOptions({ foo: 'bar' })    // Mock options passed in //.withArguments(['name-x'])      // Mock the arguments
        .withPrompts(defaultPromts) // Mock the prompt answers
        .toPromise();
    });

    it('generate a src/middleware/index.js file', function () {
      assert.file(['src/middleware/index.js']);
    });
  });


  describe('creating model files', function () {
    describe('when mssql is NOT enabled', function () {
      before(function () {
        return helpers.run(path.join(__dirname, '../app')) //.withOptions({ foo: 'bar' })    // Mock options passed in //.withArguments(['name-x'])      // Mock the arguments
          .withPrompts(defaultPromts) // Mock the prompt answers
          .toPromise();
      });

      it('do not generate a src/models/user.js file', function () {
        assert.noFile(['src/models/user.js']);
      });

    });

    describe('when mssql is enabled', function () {
      before(function () {
        return helpers.run(path.join(__dirname, '../app')) //.withOptions({ foo: 'bar' })    // Mock options passed in //.withArguments(['name-x'])      // Mock the arguments
          .withPrompts(withYesPromts) // Mock the prompt answers
          .toPromise();
      });

      it('generate a src/models/user.js file', function () {
        assert.file(['src/models/user.js']);
      });
    })
  });


  describe('when creating REST API files', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../app')) //.withOptions({ foo: 'bar' })    // Mock options passed in //.withArguments(['name-x'])      // Mock the arguments
        .withPrompts(defaultPromts) // Mock the prompt answers
        .toPromise();
    });

    it('generate a src/api/index.js file', function () {
      assert.file(['src/api/index.js']);
    });
  });


  describe('when rabbit mq listener is enabled', function() {
    before(function () {
      return helpers.run(path.join(__dirname, '../app')) //.withOptions({ foo: 'bar' })    // Mock options passed in //.withArguments(['name-x'])      // Mock the arguments
        .withPrompts(withYesPromts) // Mock the prompt answers
        .toPromise();
    });

    it('generate a src/middleware/rabbitmq/listener.js file', function () {
      assert.file(['src/middleware/rabbitmq/listener.js']);
    });

  });


});