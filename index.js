/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-truncate',
  included: function(app) {
    app.import('vendor/styles/truncate-multiline.css');
  }
};
