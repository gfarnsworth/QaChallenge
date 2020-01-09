let baseConfig = require('./protractor.config');
const HTMLReport = require('protractor-html-reporter');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const protractor = require('protractor');

process.env.CHROME_BIN = require('puppeteer').executablePath();

baseConfig.config.suites = {
  smoke: [
    './tests/smoke/home.ts',
  ],
};

// Setup Args
// remove '--headless', '--disable-gpu' if you would like to watch the test run (non-headless)
let args = ['--log-level=3', '--window-size=1500,1200'];
let mobileUserAgent = process.argv.filter(x => x === '--mobileUserAgent').length > 0;
if (mobileUserAgent) {
  args.push('user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A405 Safari/600.1.4');
}

baseConfig.config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    binary: process.env.CHROME_BIN,
    args: args
  }
};

baseConfig.config.onPrepare = () => {
  require('ts-node').register({
    project: './tsconfig.e2e.json'
  })
  protractor.browser.ignoreSynchronization = true;
  const jasmineReporters = require('jasmine-reporters');
  const fse = require('fs-extra');
  jasmine.getEnv().addReporter(
    new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: './reports',
      filePrefix: 'xmloutput'
    })
  );
  jasmine.getEnv().addReporter(
    new SpecReporter({
      spec: {
        displayStacktrace: false
      }
    })
  );
  fse.emptyDir('./reports/screenshots/', err => { });
  jasmine.getEnv().addReporter({
    specDone: function (result) {
      if (result.status === 'failed') {
        protractor.browser.getCapabilities().then(function (caps) {
          let browserName = caps.get('browserName');
          protractor.browser.takeScreenshot().then(function (png) {
            let stream = fse.createWriteStream(`./reports/screenshots/${browserName}-${result.fullName}.png`);
            stream.write(new Buffer(png, 'base64'));
            stream.end();
          });
        });
      }
    }
  });
};

baseConfig.config.onComplete = () => {
  let browserName, browserVersion;
  let browserCaps = browser.getCapabilities();
  browserCaps.then(caps => {
    browserName = caps.get('browserName');
    browserVersion = caps.get('version');
    let testConfig = {
      reportTitle: 'Smoke Tests: Node Mobile',
      outputPath: './reports',
      testBrowser: browserName,
      browserVersion: browserVersion,
      modifiedSuiteName: false,
      screenshotsOnlyOnFailure: true
    };
    new HTMLReport().from('./reports/xmloutput.xml', testConfig);
  });
}

module.exports = baseConfig;

