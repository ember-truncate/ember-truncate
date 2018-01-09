/*jshint node:true*/
const supported = require('./scenarios-supported');
const latest = require('./scenarios-latest');
module.exports = {
  scenarios: [
    ...supported.scenarios,
    ...latest.scenarios,
  ],
};
