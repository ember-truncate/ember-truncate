import Ember from 'ember';
import ResizeHandlerMixin from 'ember-singularity-mixins/mixins/resize-handler';
import clamp from 'ember-truncate/utils/clamp';
import layout from 'ember-truncate/templates/components/truncate-multiline';
import diffAttrs from 'ember-diff-attrs';

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
   * Document service uses the browser document object or falls back to a simple-dom
   * implementation.
   */
  document: Ember.inject.service('-document'),

  /**
   * The text to truncate. This is overridden if the block form is used.
   * @type {string}
   */
  text: '',

  /**
   * The number of lines at which to begin truncation.
   * @type {number}
   * @default 3
   */
  lines: 3,

  /**
   * Whether or not to truncate the text. Can be used to control truncation from outside of the
   * component.
   * @type {boolean}
   */
  truncate: true,

  /**
   * Getter/setter for internal truncate state. Handles resetting the button destination.
   * @type {boolean}
   * @private
   */
  _truncate: Ember.computed({
    get() { return this.__truncate; },
    set(key, value) {
      if (!value) {
        this.set('_buttonDestination', null);
      }

      return this.__truncate = value;
    },
  }),

  /**
   * Internal state of whether or not to truncate the text.
   * @type {boolean}
   * @private
   */
  __truncate: true,

  /**
   * Whether the text is being truncated or not. Passed to the block context as `isTruncated`.
   * @property truncationState
   * @type {boolean}
   * @readonly
   */
  truncationState: Ember.computed.readOnly('_truncate'),

  /**
   * Whether the text needed truncating or was short enough already.
   * @property isTruncated
   * @type {boolean}
   * @readonly
   */
  isTruncated: Ember.computed.readOnly('_isTruncated'),

  /**
   * Internal state of whether or not the text needed truncating.
   * @type {boolean}
   * @private
   */
  _isTruncated: false,

  /**
   * Keeps track of whether or not _doTruncate has been run.
   * @type {boolean}
   * @private
   */
  _didTruncate: false,

  /**
   * The element into which the wormhole will render the truncation toggle button.
   * @type {HTMLElement}
   * @private
   */
  _buttonDestination: null,

  /**
   * Whether the wormhole should render the button in place instead of moving it into the
   * destination.
   * @type {boolean}
   * @private
   */
  _buttonInPlace: Ember.computed.not('_buttonDestination'),

  /**
   * Resets the component when the `text` attribute of the component has changed.
   * @return {Void}
   */
  didReceiveAttrs: diffAttrs('lines', 'text', 'truncate', function(changedAttrs) {
    // `changedAttrs` will be null for the first invocation
    // short circuiting for this case makes `didReceiveAttrs` act like `didUpdateAttrs`
    if (changedAttrs == null) { return; }

    if ('truncate' in changedAttrs) {
      this.set('_truncate', this.get('truncate'));
    }

    if ('text' in changedAttrs || 'truncate' in changedAttrs || 'lines' in changedAttrs) {
      this._resetState();
    }
  }),

  /**
   * Kicks off the truncation after render.
   * @return {Void}
   */
  didRender() {
    this._super(...arguments);
    if (!this.get('_didTruncate') && this.get('_truncate')) {
      Ember.run.scheduleOnce('afterRender', this, this._doTruncation);
    }
  },

  /**
   * Resets the state of the component.
   * @return {Void}
   * @private
   */
  _resetState() {
    const truncate = this.get('_truncate');
    if (truncate) {
      // trigger a rerender/retruncate
      this.setProperties({
        _didTruncate: false,
        _truncate: false,
      });
      Ember.run.scheduleOnce('afterRender', this, () => {
        this.set('_truncate', truncate);
      });
    }
  },

  _addWrappingSpan(truncationTargetElem) {
    const doc = this.get('document');
    const ellipsizedSpan = truncationTargetElem.lastChild;

    truncationTargetElem.removeChild(ellipsizedSpan);

    const wrappingSpan = doc.createElement('span');
    wrappingSpan.classList.add(`${cssNamespace}--last-line-wrapper`);
    wrappingSpan.appendChild(ellipsizedSpan);

    truncationTargetElem.appendChild(wrappingSpan);

    return wrappingSpan;
  },

  /**
   * Does the truncation by calling the clamp utility.
   * @return {Void}
   * @private
   */
  _doTruncation() {
    const doc = this.get('document');

    const el = this.element.querySelector(`.${cssNamespace}--truncation-target`);
    // TODO: make the assertion message more descriptive
    Ember.assert('must use the `target` component from the yielded namespace', el instanceof HTMLElement);

    clamp(el, this.get('lines'), `${cssNamespace}--last-line`, doc, (didTruncate) => {
      this.set('_isTruncated', didTruncate);
      if (didTruncate) {
        this.set('_buttonDestination', this._addWrappingSpan(el));
      }
    });

    this.set('_didTruncate', true);
  },

  /**
   * Kicks off truncation on resize by triggering a rerender.
   * @return {Void}
   */
  resize() {
    this._resetState();
  },

  /**
   * Returns false so truncation does not happen twice on insert.
   * @property resizeOnInsert
   * @type {boolean}
   */
  resizeOnInsert: false,

  actions: {
    /**
     * Called by the "see more/see less" button. Toggles truncation.
     * @return {Void}
     */
    toggleTruncate() {
      let wasTruncated = this.get('_truncate');
      this.toggleProperty('_truncate');

      if (wasTruncated) {
        const onExpand = this.onExpand;
        if (typeof onExpand === 'function') {
          onExpand();
        }
      } else {
        // Need to reset state when the text is retruncated via the 'See Less' button
        this._resetState();

        const onCollapse = this.onCollapse;
        if (typeof onCollapse === 'function') {
          onCollapse();
        }
      }

      const onToggle = this.onToggle;
      if (typeof onToggle === 'function') {
        onToggle(!wasTruncated);
      }
    },
  },
});
