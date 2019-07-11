import Component from '@ember/component';
import layout from 'ember-truncate/templates/components/button-toggle';

export default Component.extend({
  layout,
  tagName: '',
  DOMClick() {
    const onClick = this.onClick;
    if (typeof onClick === 'function') {
      onClick();
    }
  }
});
