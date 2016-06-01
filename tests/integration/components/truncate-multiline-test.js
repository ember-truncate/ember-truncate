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

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span>supercalifragilisticexpialidocious</span><button class="truncate-multiline--button-hidden">see more</button></span></div></div></div>');
});

test('clicking the button shows/hides full text', function(assert) {
  assert.expect(3);

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
  this.$('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view">supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious<button class="truncate-multiline--button">see less</button></div></div>', 'not truncated after clicking button');

  this.$('button').click();
  assert.equal(this$.html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button">see more</button></span></div></div></div>', 'truncated before clicking button');
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

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious </span><span>supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span class="truncate-multiline--last-line">supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button-hidden">see more</button></span></div></div></div>');
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

  assert.equal(this.$().html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view">supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious<button class="truncate-multiline--button-hidden">see less</button></div></div>', 'not truncated after clicking button');
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
  this$.find('[data-ember-action]').removeAttr('data-ember-action');

  assert.equal(this$.html().replace(/\n|  +/g, ''), '<div style="width: 362px; font: 16px sans-serif;"><div class="ember-view">supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious<button class="truncate-multiline--button-hidden">see less</button></div></div>', 'no truncation when myTruncate=false');

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
  assert.equal(this.$('#truncate-multiline--test-container').html().replace(/\n|  +/g, ''), '<div class="ember-view"><div class="truncate-multiline--truncation-target"><span>supercalifragilisticexpialidocious supercalifragilisticexpialidocious </span><span class="truncate-multiline--last-line-wrapper"><span>supercalifragilisticexpialidocious supercalifragilisticexpialidocious</span><button class="truncate-multiline--button-hidden">see more</button></span></div></div>', 'truncation after resizing');
});

test('clicking the see more/less button fires user defined actions', function(assert) {
  assert.expect(4);

  this.on('assertOnExpand', () => assert.ok(true, 'onExpand action triggered'));
  this.on('assertOnCollapse', () => assert.ok(true, 'onCollapse action triggered'));
  this.on('assertOnToggleTruncate', () => assert.ok(true, 'onToggleTruncate action triggered')); // Runs twice since it fires on every button click

  // Template block usage:
  this.render(hbs`
    <div id="truncate-multiline--test-container" style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline
        onExpand=(action "assertOnExpand")
        onCollapse=(action "assertOnCollapse")
        onToggleTruncate=(action "assertOnToggleTruncate")
        text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  return wait().then(() => {
    this.$('button').click();

    return wait();
  }).then(() => {
    this.$('button').click();
  });
});
