/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-truncate',
  included: function(app, parentAddon) {
    var target = (parentAddon || app);

    if (target.app) {
      target = target.app;
    }

    target.import('vendor/styles/truncate-multiline.css');
  }
};
