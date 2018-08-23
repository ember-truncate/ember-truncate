/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-truncate',
  included: function(app) {
    this._super.included.apply(this, arguments);
    
    app.import('vendor/styles/truncate-multiline.css');
  }
};
