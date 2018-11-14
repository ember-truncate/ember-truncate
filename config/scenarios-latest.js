/*jshint node:true*/
module.exports = {
  scenarios: [
    {
      name: 'ember-release',
      npm: {
        devDependencies: {
          'ember-source': null,
        },
      },
    },
    {
      name: 'ember-beta',
      npm: {
        devDependencies: {
          'ember-source': null,
        },
      },
    },
    {
      name: 'ember-canary',
      npm: {
        devDependencies: {
          'ember-source': null,
        },
      },
    },
  ],
};
