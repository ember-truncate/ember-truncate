/* eslint-env node */
module.exports = {
  "framework": "qunit",
  "test_page": "tests/index.html?hidepassed",
  "disable_watching": true,
  "launch_in_ci": [
    "PhantomJS"
  ],
  "launch_in_dev": [
    "PhantomJS",
    "Chrome"
  ],
  browser_args: {
    Chrome: [
      '--headless',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-software-rasterizer',
      '--remote-debugging-port=0',
      '--window-size=1440,900'
    ]
  },
};
