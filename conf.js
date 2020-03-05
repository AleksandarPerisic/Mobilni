// Declare jasmine spec reporter (in terminal)
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
// An example configuration file
exports.config = {
    // The address of a running selenium server.
    //seleniumAddress: 'http://localhost:4444/wd/hub',

    // Direct communication with chrome or firefox driver
    directConnect: true,

    // Capabilities to be passed to the webdriver instance.
    /*multiCapabilities: [{
        browserName: 'chrome'
    },
    {
        browserName: 'firefox'
    }],*/

    //chromeDriver: './chromedriver',
    capabilities:{
        browserName: 'chrome',
        /*chromeOptions: {
            args: ["--incognito"]
        }*/
    },


    params:{
        login:{
            user:"aca994nbg@gmail.com",
            //user:"otacmakarije994@gmail.com",
            password:"nbaca1108"
        },
    },
    // Starting url of application
    baseUrl: 'http://www.kupujemprodajem.com',

    // Spec patterns are relative to the configuration file location passed
    // to protractor (in this example conf.js).
    // They may include glob patterns.
    specs: ['./tests/kp.login.spec.js',
            './tests/kp.spec.js'
            //'./tests/kp.newproduct.spec.js',
            //'./tests/kp.delete.spec.js'
    ],


    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        print: function() {}, // Remove dot from terminal report
        showColors: true, // Use colors in the terminal report
        defaultTimeoutInterval: 36000000,
    },
    // Function called once protractor is ready and available, and before the specs are executed
    onPrepare: () => {
        // Turn off waiting for angular (for non-angular applications)
        browser.ignoreSynchronization = true;

        // Maximize browser
        browser.manage().window().maximize();

        // Set jasmine spec reporter
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true
            }
        }));

        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
              savePath: '\screenshots'
            })
          );
    }
};

