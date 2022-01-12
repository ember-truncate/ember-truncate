import Component from '@ember/component';
import { action } from '@ember/object';
import layout from 'ember-truncate/templates/components/button-toggle';

export default Component.extend({
  layout,
  tagName: '',
  DOMClick: action(function () {
    const onClick = this.onClick;
    if (typeof onClick === 'function') {
      onClick();
    }
  }),
});
