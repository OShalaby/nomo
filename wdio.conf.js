const { join } = require('path');
const { execSync } = require('child_process');
require('dotenv').config();

let cidToCapabilitiesMap = {};

exports.config = {
    runner: 'local',
    specs: ['./features/**/*.feature'],
    exclude: [],
    maxInstances: 1,
    services: [
        ['appium', {
            command: 'appium',
            args: {
                address: '127.0.0.1',
                port: process.env.PORT,
            },
        }],
    ],
    capabilities: [
        {
            platformName: 'Android',
            'appium:deviceName': process.env.DEVICE_NAME_ANDROID,
            'appium:avd': process.env.AVD_ANDROID,
            'appium:platformVersion': process.env.PLATFORM_VERSION_ANDROID,
            'appium:automationName': 'UiAutomator2',
            'appium:udid': process.env.UDID_ANDROID,
            'appium:autoGrantPermissions': true,
            'appium:app': join(process.cwd(), 'apps/demoApp.apk'),
        },
        {
            platformName: 'iOS',
            'appium:deviceName': process.env.DEVICE_NAME_IOS,
            'appium:udid': process.env.UDID_IOS,
            'appium:platformVersion': process.env.PLATFORM_VERSION_IOS,
            'appium:automationName': 'XCUITest',
            'appium:updatedWDABundleId': process.env.UPDATED_WDA_BUNDLE_ID,
            'appium:app': join(process.cwd(), 'apps/demoApp.app'),
        },
    ],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'cucumber',
    cucumberOpts: {
        require: ['./features/step-definitions/**/*.js'],
        backtrace: false,
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        profile: [],
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false,
    },
    reporters: ['spec', ['allure', { outputDir: './reports/allure-results' }]],
    onPrepare: function (config, capabilities) {
        capabilities.forEach((cap, index) => {
            const cid = `${index}-0`;
            cidToCapabilitiesMap[cid] = cap;
        });
    },
    onWorkerEnd: function (cid, exitCode, specs, capabilities) {
        const matchingCapability = cidToCapabilitiesMap[cid];
        if (!matchingCapability) {
            console.warn(`No matching capability found for worker: ${cid}`);
            return;
        }
        const platformName = matchingCapability.platformName;
        if (platformName === 'Android') {
            execSync('adb emu kill');
        } else if (platformName === 'iOS') {
            execSync(`xcrun simctl shutdown ${matchingCapability['appium:udid']}`);
        }
    },

    onComplete: function (exitCode, config, capabilities, results) {
        console.log('Generating Allure Report...');
        const { exec } = require('child_process');
        exec('allure generate ./reports/allure-results --clean -o ./reports/allure-report', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error generating Allure report: ${stderr}`);
            } else {
                console.log('Allure report successfully generated');
                console.log(stdout);
            }
        });
    }
};
