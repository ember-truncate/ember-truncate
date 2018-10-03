import Component from '@ember/component';
import layout from 'ember-truncate/templates/just-yield';

export default Component.extend({
  layout,
  classNames: [
    'truncate-multiline--truncation-target',
  ],
});
