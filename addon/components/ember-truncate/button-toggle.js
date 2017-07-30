import Ember from 'ember';
import layout from '../../templates/just-yield';

export default Ember.Component.extend({
  layout,
  tagName: 'button',
  classNames: [
    'truncate-multiline--button',
  ],
  click() {
    const onClick = this.onClick;
    if (typeof onClick === 'function') {
      onClick();
    }
  }
});
