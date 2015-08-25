/* global CustomEvent */

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

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
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`<div style="width: 362px; font: 16px sans-serif;">{{truncate-multiline text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}</div>`);

  // remove attributes we have no control over
  this.$('[id^=ember]').removeAttr('id');
  this.$('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button">see more</button></span></div></div></div>');
});

 test('block form works', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

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

 test('specifying different button text works', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline buttonText="click me" text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  // remove attributes we have no control over
  this.$('[id^=ember]').removeAttr('id');
  this.$('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button">click me</button></span></div></div></div>');
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

 test('clicking the button shows full text', function(assert) {
  assert.expect(2);

  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  let this$ = this.$().clone();
  // remove attributes we have no control over
  this$.find('[id^=ember]').removeAttr('id');
  this$.find('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this$.html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button">see more</button></span></div></div></div>', 'truncated before clicking button');

  this.$('button').click();
  // remove attributes we have no control over
  this.$('[id^=ember]').removeAttr('id');

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view">supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious</div></div>', 'not truncated after clicking button');
});

 test('passing showButton=false hides the button', function(assert) {
  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline showButton=false text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  // remove attributes we have no control over
  this.$('[id^=ember]').removeAttr('id');
  this.$('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button-hidden"><!----></button></span></div></div></div>');
});

 test('truncation can be controlled externally via the truncate attribute', function(assert) {
  assert.expect(2);

  // don't truncate
  this.set('myTruncate', false);

  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline truncate=myTruncate text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  let this$ = this.$().clone();
  // remove attributes we have no control over
  this$.find('[id^=ember]').removeAttr('id');

  assert.equal(this$.html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view">supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious</div></div>', 'no truncation when myTruncate=false');

  // do truncate
  this.set('myTruncate', true);

  // remove attributes we have no control over
  this.$('[id^=ember]').removeAttr('id');
  this.$('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button">see more</button></span></div></div></div>', 'truncation when myTruncate=true');
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
  assert.equal(this.$('#truncate-multiline--test-container').html().replace(/\n|  +/g, ''), '<div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span>supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button-hidden"></button></span></div></div>', 'truncation after resizing');
});
