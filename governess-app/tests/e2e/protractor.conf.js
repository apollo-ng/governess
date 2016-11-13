// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/docs/referenceConf.js

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter');
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    '../../src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:8100/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'tests/e2e'
    });
  },

  // Assign the test reporter to each running instance
  onPrepare: function() {

    // Define browser size for tests/screenshots
    var width = 360;
    var height = 640;
    browser.driver.manage().window().setSize(width, height);

    jasmine.getEnv().addReporter(new SpecReporter());
    jasmine.getEnv().addReporter(new HtmlScreenshotReporter({
      dest: 'tests/e2e/screenshots',
      filename: 'index.html',
      cleanDestination: true,
      showSummary: false,
      showConfiguration: false,
      reportTitle: null,
      pathBuilder: function(currentSpec, suites) {
        var name = currentSpec.fullName;
        var testname = name.replace(/\s+/g, '-').toLowerCase();
        return testname;
      }
    }));
  }

};
