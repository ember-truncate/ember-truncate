import Ember from 'ember';
import ResizeHandlerMixin from 'ember-singularity-mixins/mixins/resize-handler';
import clamp from 'ember-truncate/utils/clamp';
import layout from 'ember-truncate/templates/components/truncate-multiline';

const cssNamespace = 'truncate-multiline';

/**
 * A generic component used to truncate text to a specified number of lines.
 *
 * It can be used in an inline form
 *
 * ```
 * {{truncate-multiline text="foo bar"}}
 * ```
 *
 * or a block form.
 *
 * ```
 * {{#truncate-multiline}}
 *   foo bar
 * {{/truncate-multiline}}
 * ```
 *
 * @class SharedShowMoreTextMultilineComponent
 */

export default Ember.Component.extend(ResizeHandlerMixin, {
  layout: layout,

  /**
   * The text to truncate. This is overridden if the block form is used.
   * @type {String}
   */
  text: '',

  /**
   * The number of lines at which to begin truncation.
   * @type {Number}
   * @default 3
   */
  lines: 3,

  /**
   * Whether or not to truncate the text. Can be used to control truncation
   * from outside of the component.
   * @type {Boolean}
   */
  truncate: true,

  /**
   * Whether the text needed truncating or was short enough already.
   * @property isTruncated
   * @type {Boolean}
   */
  isTruncated: Ember.computed.readOnly('_isTruncated'),

  /**
   * Internal state of whether or not the text needed truncating.
   * @type {Boolean}
   * @private
   */
  _isTruncated: false,

  /**
   * An override that can be used to hide the "see more" button.
   * @type {Boolean}
   */
  showButton: true,

  /**
   * The text to display in the "see more" button.
   * @type {String}
   */
  buttonText: 'see more',

  /**
   * Whether or not the "see more" button should be visible.
   * @property _shouldShowButton
   * @type {Boolean}
   * @private
   */
  _shouldShowButton: Ember.computed.and('showButton', 'isTruncated'),

  /**
   * Keeps track of whether or not _doTruncate has been run.
   * @type {Boolean}
   * @private
   */
  _didTruncate: false,

  /**
   * Kicks off the truncation after render.
   * @return {Void}
   */
  didRender() {
    if (!this.get('_didTruncate')) {
      this._doTruncation();
    }
  },

  /**
   * Does the truncation by calling the clamp utility.
   * @return {Void}
   * @private
   */
  _doTruncation() {
    if (this.get('truncate')) {
      Ember.run.scheduleOnce('afterRender', this, () => {
        let el = this.element.querySelector(`.${cssNamespace}--truncation-target`);
        let button = this.element.querySelector(`[class^=${cssNamespace}--button]`);
        button.parentNode.removeChild(button);
        clamp(el, this.get('lines'), (didTruncate) => this.set('_isTruncated', didTruncate), `${cssNamespace}--last-line`);
        let ellipsizedSpan = el.lastChild;
        let wrappingSpan = document.createElement('span');
        wrappingSpan.classList.add(`${cssNamespace}--last-line-wrapper`);
        if (ellipsizedSpan) {
          el.removeChild(ellipsizedSpan);
          wrappingSpan.appendChild(ellipsizedSpan);
        }
        wrappingSpan.appendChild(button);
        el.appendChild(wrappingSpan);
        this.set('_didTruncate', true);
      });
    }
  },

  /**
   * Kicks off truncation on resize by triggering a rerender.
   * @return {Void}
   */
  resize() {
    let truncate = this.get('truncate');
    if (truncate) {
      // trigger a rerender/retruncate
      this.set('_didTruncate', false);
      this.set('truncate', false);
      Ember.run.scheduleOnce('afterRender', this, () => {
        this.set('truncate', truncate);
      });
    }
  },

  /**
   * Returns false so truncation does not happen twice on insert.
   * @property resizeOnInsert
   * @type {Boolean}
   */
  resizeOnInsert: Ember.computed(() => false),

  actions: {
    /**
     * Called by the "see more" button. Turns off truncation.
     * @return {Void}
     */
    showMore() {
      this.set('truncate', false);
      if (this.get('onExpand')) {
        this.sendAction('onExpand');
      }
    }
  }
});
