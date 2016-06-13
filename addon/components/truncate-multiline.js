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
   * An override that can be used to hide both buttons.
   * @type {Boolean}
   */
  showButton: true,

  /**
   * An override that can be used to hide the "see more" button.
   * @type {Boolean}
   */
  showSeeMoreButton: true,

  /**
   * An override that can be used to hide the "see less" button.
   * @type {Boolean}
   */
  showSeeLessButton: true,

  /**
   * The text to display in the "see more" button.
   * @type {String}
   */
  seeMoreButtonText: 'see more',

  /**
   * The text to display in the "see less" button.
   * @type {String}
   */
  seeLessButtonText: 'see less',

  /**
   * Whether or not the "see more" button should be visible.
   * @property _shouldShowSeeMoreButton
   * @type {Boolean}
   * @private
   */
  _shouldShowSeeMoreButton: Ember.computed.and('showButton', 'showSeeMoreButton', 'isTruncated'),

  /**
   * Whether or not the "see less" button should be visible.
   * @property _shouldShowSeeLessButton
   * @type {Boolean}
   * @private
   */
  _shouldShowSeeLessButton: Ember.computed.and('showButton', 'showSeeLessButton', 'isTruncated'),

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
  // didInsertElement() {
  //   if (!this.get('_didTruncate')) {
  //     this._doTruncation();
  //   }
  // },
  
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
        clamp(el, this.get('lines'), (didTruncate) => this.set('_isTruncated', didTruncate), `${cssNamespace}--last-line`, window, document);
        let ellipsizedSpan = el.lastChild;
        
        if (ellipsizedSpan) {
          el.removeChild(ellipsizedSpan);
        }
        
        let wrappingSpan = document.createElement('span');
        wrappingSpan.classList.add(`${cssNamespace}--last-line-wrapper`);
        
        if (ellipsizedSpan) {
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
     * Called by the "see more/see less" button. Toggles truncation.
     * @return {Void}
     */
    toggleTruncate() {
      let wasTruncated = this.get('truncate');
      this.toggleProperty('truncate');
      
      if (wasTruncated) {
        let onExpand = this.attrs.onExpand;
        
        if (onExpand) {
          if (typeof onExpand === 'function') {
            onExpand();
          } else {
            this.sendAction('onExpand');
          }
        }
      } else {
        this._doTruncation();
        let onCollapse = this.attrs.onCollapse;
        
        if (onCollapse) {
          if (typeof onCollapse === 'function') {
            onCollapse();
          } else {
            this.sendAction('onCollapse');
          }
        }
      }
      
      let onToggleTruncate = this.attrs.onToggleTruncate;
      
      if (onToggleTruncate) {
        if (typeof onToggleTruncate === 'function') {
          onToggleTruncate(!wasTruncated);
        } else {
          this.sendAction('onToggleTruncate', !wasTruncated);
        }
      }
    }
  }
});
