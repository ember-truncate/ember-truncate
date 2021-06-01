'use strict';

module.exports = {
  name: require('./package').name,
  included: function (app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/styles/truncate-multiline.css');
  },
};
