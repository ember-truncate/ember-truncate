import Ember from 'ember';
import ResizeHandlerMixin from 'ember-singularity-mixins/mixins/resize-handler';
import clamp from 'ember-truncate/utils/clamp';
import layout from 'ember-truncate/templates/components/truncate-multiline';
import diffAttrs from 'ember-diff-attrs';
import RunMixin from 'ember-lifeline/mixins/run';

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

export default Ember.Component.extend(ResizeHandlerMixin, RunMixin, {
  layout: layout,

  /**
   * Document service uses the browser document object or falls back to
   * a simple-dom implementation.
   */
  document: Ember.inject.service('-document'),

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
   * Internal state of whether or not to truncate the text.
   * @type {Boolean}
   * @private
   */
  _truncate: true,

  /**
   * Whether the text is being truncated or not. Passed to the yielded namespace as `isTruncated`.
   * @property truncationState
   * @type {Boolean}
   * @readonly
   */
  truncationState: Ember.computed.readOnly('_truncate'),

  /**
   * Whether the text needed truncating or was short enough already.
   * @property isTruncated
   * @type {Boolean}
   * @readonly
   */
  isTruncated: Ember.computed.readOnly('_isTruncated'),

  /**
   * Internal state of whether or not the text needed truncating.
   * @type {Boolean}
   * @private
   */
  _isTruncated: false,

  /**
   * Keeps track of whether or not _doTruncate has been run.
   * @type {Boolean}
   * @private
   */
  _didTruncate: false,

  /**
   * Resets the component when the `text` attribute of the component has changed
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
   * Resets the state of the component
   * @return {Void}
   * @private
   */
  _resetState() {
    const truncate = this.get('_truncate');
    if (truncate) {
      // trigger a rerender/retruncate
      this.set('_didTruncate', false);
      this.set('_truncate', false);
      Ember.run.scheduleOnce('afterRender', this, () => {
        this.set('_truncate', truncate);
      });
    }
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
    const button = removeButton(this);
    clamp(el, this.get('lines'), (didTruncate) => this.set('_isTruncated', didTruncate), `${cssNamespace}--last-line`, doc);
    const ellipsizedSpan = el.lastChild;
    el.removeChild(ellipsizedSpan);
    const wrappingSpan = doc.createElement('span');
    wrappingSpan.classList.add(`${cssNamespace}--last-line-wrapper`);
    wrappingSpan.appendChild(ellipsizedSpan);
    if (button != null) {
      appendButton(wrappingSpan, button);
    } else {
      // the button may not be available until after a rerender
      this.runTask(() => {
        appendButton(wrappingSpan, removeButton(this));
      }, 1);
    }
    el.appendChild(wrappingSpan);
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
   * @type {Boolean}
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

      const onToggleTruncate = this.onToggleTruncate;
      if (typeof onToggleTruncate === 'function') {
        onToggleTruncate(!wasTruncated);
      }
    },
  },
});

function removeButton(context) {
  const button = context.element.querySelector(`[class^=${cssNamespace}--button]`);
  if (button != null) { button.parentNode.removeChild(button); }
  return button;
}

function appendButton(wrapper, button) {
  if (button != null) { wrapper.appendChild(button); }
}
