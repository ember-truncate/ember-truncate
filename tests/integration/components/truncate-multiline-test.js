/* global CustomEvent */

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('truncate-multiline', 'Integration | Component | truncate-multiline', {
  beforeEach() {
    // reset zoom on testing container to fix discrepancy in chrome
    document.querySelector('#ember-testing-container #ember-testing').style.zoom = 1;
  },
  afterEach() {
    // undo zoom reset
    document.querySelector('#ember-testing-container #ember-testing').style.zoom = null;
  },
  integration: true
});

test('inline form works', function(assert) {
  this.render(hbs`<div style="width: 362px; font: 16px sans-serif;">{{truncate-multiline text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}</div>`);

  // remove attributes we have no control over
  this.$('[id^=ember]').removeAttr('id');
  this.$('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button">see more</button></span></div></div></div>');
});

test('block form works', function(assert) {
  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{#truncate-multiline~}}
        supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious
      {{~/truncate-multiline}}
    </div>
  `);

  // remove attributes we have no control over
  this.$('[id^=ember]').removeAttr('id');
  this.$('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button">see more</button></span></div></div></div>');
});

test('block form with nested elements works', function(assert) {
  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{#truncate-multiline~}}
        <b><i>supercalifragilisticexpialidocious supercalifragilisticexpialidocious</i></b> <i>a <b>e</b> i</i> supercalifragilisticexpialidocious supercalifragilisticexpialidocious
      {{~/truncate-multiline}}
    </div>
  `);

  // remove attributes we have no control over
  this.$('[id^=ember]').removeAttr('id');
  this.$('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span><b><i>supercalifragilisticexpialidocious </i></b></span><span><b><i>supercalifragilisticexpialidocious</i></b> <i>a <b>e</b> i</i> </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button">see more</button></span></div></div></div>');
});

test('specifying a different number of lines works', function(assert) {
  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline lines=2 text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  // remove attributes we have no control over
  this.$('[id^=ember]').removeAttr('id');
  this.$('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button">see more</button></span></div></div></div>');
});

test('specifying different button texts works', function(assert) {
  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline seeMoreButtonText="click me" seeLessButtonText="then click me" text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  let this$ = this.$().clone();
  // remove attributes we have no control over
  this$.find('[id^=ember]').removeAttr('id');
  this$.find('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this$.html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button">click me</button></span></div></div></div>', 'custom "see more" text is correct');

  this.$('button').click();
  // remove attributes we have no control over
  this.$('[id^=ember]').removeAttr('id');
  this.$('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view">supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious<button class="truncate-multiline--button">then click me</button></div></div>', 'custom "see less" text is correct');
});

test('specifying different button a11y texts works', function(assert) {
  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline seeMoreButtonText="click me" seeMoreButtonA11yText="Show more about this test" seeLessButtonText="then click me" seeLessButtonA11yText="Show less about this test" text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  let this$ = this.$().clone();
  // remove attributes we have no control over
  this$.find('[id^=ember]').removeAttr('id');
  this$.find('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this$.html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button"><span aria-hidden=\"true\">click me</span><span class=\"truncate-multiline--visually-hidden\">Show more about this test</span></button></span></div></div></div>', 'custom "see more" text and a11y is correct');

  this.$('button').click();
  // remove attributes we have no control over
  this.$('[id^=ember]').removeAttr('id');
  this.$('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view">supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious<button class="truncate-multiline--button"><span aria-hidden=\"true\">then click me</span><span class=\"truncate-multiline--visually-hidden\">Show less about this test</span></button></div></div>', 'custom "see less" text and a11y is correct');
});

test('specifying equal button and a11y texts works', function(assert) {
  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline seeMoreButtonText="click me" seeMoreButtonA11yText="click me" seeLessButtonText="then click me" seeLessButtonA11yText="then click me" text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  let this$ = this.$().clone();
  // remove attributes we have no control over
  this$.find('[id^=ember]').removeAttr('id');
  this$.find('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this$.html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button">click me</button></span></div></div></div>', 'custom "see more" text is correct');

  this.$('button').click();
  // remove attributes we have no control over
  this.$('[id^=ember]').removeAttr('id');
  this.$('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view">supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious<button class="truncate-multiline--button">then click me</button></div></div>', 'custom "see less" text is correct');
});

test('the button is hidden if the text isn\'t long enough to truncate', function(assert) {
  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  // remove attributes we have no control over
  this.$('[id^=ember]').removeAttr('id');
  this.$('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span>supercalifragilisticexpialidocious</span><button class="truncate-multiline--button-hidden"><!----></button></span></div></div></div>');
});

test('clicking the button shows/hides full text', function(assert) {
  assert.expect(3);

  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  let $clone1 = this.$().clone();
  // remove attributes we have no control over
  $clone1.find('[id^=ember]').removeAttr('id');
  $clone1.find('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal($clone1.html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button">see more</button></span></div></div></div>', 'truncated before clicking button');

  this.$('button').click();
  let $clone2 = this.$().clone();
  // remove attributes we have no control over
  $clone2.find('[id^=ember]').removeAttr('id');
  $clone2.find('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal($clone2.html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view">supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious<button class="truncate-multiline--button">see less</button></div></div>', 'not truncated after clicking button');

  this.$('button').click();
  let $clone3 = this.$().clone();
  // remove attributes we have no control over
  $clone3.find('[id^=ember]').removeAttr('id');
  $clone3.find('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal($clone3.html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button">see more</button></span></div></div></div>', 'truncated after clicking button again');
});

test('truncation can be controlled externally via the truncate attribute', function(assert) {
  assert.expect(3);

  // do truncate
  this.set('myTruncate', true);

  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline truncate=myTruncate text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  let this$ = this.$().clone();
  // remove attributes we have no control over
  this$.find('[id^=ember]').removeAttr('id');
  this$.find('[data-ember-action]').removeAttr('data-ember-action');
  assert.equal(this$.html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button">see more</button></span></div></div></div>', 'truncation when myTruncate=true');

  // don't truncate
  this.set('myTruncate', false);

  // remove attributes we have no control over
  this.$('[id^=ember]').removeAttr('id');
  this.$('[data-ember-action]').removeAttr('data-ember-action');
  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view">supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious<button class="truncate-multiline--button">see less</button></div></div>', 'no truncation when myTruncate=false');

  // do truncate again to ensure it works
  this.set('myTruncate', true);

  // remove attributes we have no control over
  this.$('[id^=ember]').removeAttr('id');
  this.$('[data-ember-action]').removeAttr('data-ember-action');
  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button">see more</button></span></div></div></div>', 'truncations again when myTruncate=true');
});

test('passing showSeeMoreButton=false hides the "see more" button', function(assert) {
  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline showSeeMoreButton=false text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  // remove attributes we have no control over
  this.$('[id^=ember]').removeAttr('id');
  this.$('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button-hidden"><!----></button></span></div></div></div>', 'see more button is hidden');
});

test('passing showSeeLessButton=false hides the "see less" button', function(assert) {
  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline showSeeLessButton=false text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  this.$('button').click();

  // remove attributes we have no control over
  this.$('[id^=ember]').removeAttr('id');
  this.$('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view">supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious<button class="truncate-multiline--button-hidden"><!----></button></div></div>', 'see less butotn is hidden');
});

test('passing showButton=false hides both buttons', function(assert) {
  this.set('myTruncate', true);

  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline truncate=myTruncate showButton=false text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  let this$ = this.$().clone();
  // remove attributes we have no control over
  this$.find('[id^=ember]').removeAttr('id');
  this$.find('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this$.html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button-hidden"><!----></button></span></div></div></div>', 'see more button is hidden');

  this.set('myTruncate', false);

  // remove attributes we have no control over
  this.$('[id^=ember]').removeAttr('id');
  this.$('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view">supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious<button class="truncate-multiline--button-hidden"><!----></button></div></div>', 'see less button is hidden');
});

test('resizing triggers truncation recompute', function(assert) {
  assert.expect(3);

  // Template block usage:
  this.render(hbs`
    <div id="truncate-multiline--test-container" style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  // verify initial truncation
  let this$ = this.$().clone();
  // remove attributes we have no control over
  this$.find('[id^=ember]').removeAttr('id');
  this$.find('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this$.html().replace(/\n|  +/g, ''), '<div id="truncate-multiline--test-container" style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button">see more</button></span></div></div></div>', 'truncation before resizing');

  // change container sizing
  this.$('#truncate-multiline--test-container')[0].style.width = '540px';
  // trigger resize event
  window.dispatchEvent(new CustomEvent('resize'));
  // remove attributes we have no control over
  this.$('[id^=ember]').removeAttr('id');
  this.$('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this.$('#truncate-multiline--test-container')[0].style.width, '540px', 'the container was resized');
  assert.equal(this.$('#truncate-multiline--test-container').html().replace(/\n|  +/g, ''), '<div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span>supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button-hidden"><!----></button></span></div></div>', 'truncation after resizing');
});

test('clicking the see more/less button fires user defined actions', function(assert) {
  assert.expect(3);

  let args = [];

  this.on('assertOnExpand', () => assert.ok(true, 'onExpand action triggered'));
  this.on('assertOnCollapse', () => assert.ok(true, 'onCollapse action triggered'));
  this.on('pushOnToggleTruncate', (isTruncated) => args.push(isTruncated));

  // Template block usage:
  this.render(hbs`
    <div id="truncate-multiline--test-container" style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline
        onExpand=(action "assertOnExpand")
        onCollapse=(action "assertOnCollapse")
        onToggleTruncate=(action "pushOnToggleTruncate")
        text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  return wait().then(() => {
    this.$('button').click();
    return wait();
  }).then(() => {
    this.$('button').click();
    return wait();
  }).then(() => {
    assert.deepEqual(args, [false, true], 'onToggleTruncate action triggered (twice) with the expected arguments');
  });
});

test('changing the component\'s text changes the resulting markup', function(assert) {
  assert.expect(2);

  this.set('textToTruncate', "supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious");

  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline text=textToTruncate}}
    </div>
  `);

  let this$ = this.$().clone();
  // remove attributes we have no control over
  this$.find('[id^=ember]').removeAttr('id');
  this$.find('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this$.html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button">see more</button></span></div></div></div>', 'original text is rendered correctly');

  this.set('textToTruncate', "supercalifragilisticexpialidocious");

  // remove attributes we have no control over
  this.$('[id^=ember]').removeAttr('id');
  this.$('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span class="truncate-multiline--last-line-wrapper"><span>supercalifragilisticexpialidocious</span><button class="truncate-multiline--button-hidden"><!----></button></span></div></div></div>', 'new text is rendered correctly');
});

test('changing the component\'s lines changes the resulting markup', function(assert) {
  assert.expect(2);

  this.set('lineToTruncate', 2);

  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline
        text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"
        lines=lineToTruncate
      }}
    </div>
  `);

  let this$ = this.$().clone();
  // remove attributes we have no control over
  this$.find('[id^=ember]').removeAttr('id');
  this$.find('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this$.html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button">see more</button></span></div></div></div>', 'original text is rendered correctly');

  this.set('lineToTruncate', 3);

  // remove attributes we have no control over
  this.$('[id^=ember]').removeAttr('id');
  this.$('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button">see more</button></span></div></div></div>', 'new number of lines is respected');
});
