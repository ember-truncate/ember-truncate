import Ember from 'ember';
import layout from 'ember-truncate/templates/components/button-toggle';

export default Ember.Component.extend({
  layout,
  tagName: '',
  DOMClick() {
    const onClick = this.onClick;
    if (typeof onClick === 'function') {
      onClick();
    }
  }
});
