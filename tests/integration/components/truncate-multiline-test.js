/* global CustomEvent */

import Ember from 'ember';
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

  const $truncationTarget = this.$('.truncate-multiline--truncation-target');
  const $truncationChunks = $truncationTarget.children();
  const $lastChunkWrapper = $truncationChunks.slice(-1);
  const $lastChunkEtc = $lastChunkWrapper.children();
  assert.ok(
    $truncationTarget,
    'the truncation target exists'
  );
  assert.equal(
    $truncationChunks.length,
    3,
    'text is truncated into chunks (default 3)'
  );
  assert.ok(
    $truncationChunks.slice(0, 2)
      .toArray()
      .every((chunk) => chunk.innerText.trim() === 'supercalifragilisticexpialidocious'),
    'first chunks contain expected text'
  );
  assert.ok(
    $lastChunkWrapper.hasClass('truncate-multiline--last-line-wrapper'),
    'last-line-wrapper class is applied to last chunk wrapper'
  );
  assert.equal(
    $lastChunkEtc.length,
    2,
    'last chunk wrapper contains two elements'
  );
  assert.ok(
    $lastChunkEtc[0].classList.contains('truncate-multiline--last-line'),
    'first element in last chunk wrapper is the last chunk'
  );
  assert.equal(
    $lastChunkEtc[0].innerText,
    'supercalifragilisticexpialidocious supercalifragilisticexpialidocious',
    'last chunk contains expected text'
  );
  assert.ok(
    $lastChunkEtc[1].tagName.toLowerCase() === 'button' &&
    $lastChunkEtc[1].classList.contains('truncate-multiline--button'),
    'second element in last chunk wrapper is the expand button'
  );
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

  const $truncationTarget = this.$('.truncate-multiline--truncation-target');
  const $truncationChunks = $truncationTarget.children();
  const $lastChunkWrapper = $truncationChunks.slice(-1);
  const $lastChunkEtc = $lastChunkWrapper.children();
  assert.ok(
    $truncationTarget,
    'the truncation target exists'
  );
  assert.equal(
    $truncationChunks.length,
    3,
    'text is truncated into chunks (default 3)'
  );
  assert.ok(
    $truncationChunks.slice(0, 2)
      .toArray()
      .every((chunk) => chunk.innerText.trim() === 'supercalifragilisticexpialidocious'),
    'first chunks contain expected text'
  );
  assert.ok(
    $lastChunkWrapper.hasClass('truncate-multiline--last-line-wrapper'),
    'last-line-wrapper class is applied to last chunk wrapper'
  );
  assert.equal(
    $lastChunkEtc.length,
    2,
    'last chunk wrapper contains two elements'
  );
  assert.ok(
    $lastChunkEtc[0].classList.contains('truncate-multiline--last-line'),
    'first element in last chunk wrapper is the last chunk'
  );
  assert.equal(
    $lastChunkEtc[0].innerText,
    'supercalifragilisticexpialidocious supercalifragilisticexpialidocious',
    'last chunk contains expected text'
  );
  assert.ok(
    $lastChunkEtc[1].tagName.toLowerCase() === 'button' &&
    $lastChunkEtc[1].classList.contains('truncate-multiline--button'),
    'second element in last chunk wrapper is the expand button'
  );
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

  const $truncationTarget = this.$('.truncate-multiline--truncation-target');
  const $truncationChunks = $truncationTarget.children();
  assert.equal(
    $truncationChunks[0].innerHTML,
    '<b><i>supercalifragilisticexpialidocious </i></b>',
    'first chunk contains expected html'
  );
  assert.equal(
    $truncationChunks[1].innerHTML,
    '<b><i>supercalifragilisticexpialidocious</i></b> <i>a <b>e</b> i</i> ',
    'second chunk contains expected html'
  );
});

test('specifying a different number of lines works', function(assert) {
  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline lines=2 text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  const $truncationTarget = this.$('.truncate-multiline--truncation-target');
  const $truncationChunks = $truncationTarget.children();
  const $lastChunkWrapper = $truncationChunks.slice(-1);
  const $lastChunkEtc = $lastChunkWrapper.children();
  assert.equal(
    $truncationChunks.length,
    2,
    'text is truncated into specified number of chunks'
  );
  assert.equal(
    $truncationChunks[0].innerText,
    'supercalifragilisticexpialidocious',
    'first chunk contains expected text'
  );
  assert.equal(
    $lastChunkEtc[0].innerText,
    'supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious',
    'last chunk contains expected text'
  );
});

test('specifying different button texts works', function(assert) {
  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline seeMoreButtonText="click me" seeLessButtonText="then click me" text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  assert.equal(
    this.$('.truncate-multiline--button').text().trim(),
    'click me',
    'custom "see more" text is correct'
  );

  this.$('button').click();

  assert.equal(
    this.$('.truncate-multiline--button').text().trim(),
    'then click me',
    'custom "see less" text is correct'
  );
});

test('specifying different button a11y texts works', function(assert) {
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline seeMoreButtonText="click me" seeMoreButtonA11yText="Show more about this test" seeLessButtonText="then click me" seeLessButtonA11yText="Show less about this test" text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  assert.equal(
    this.$('.truncate-multiline--visually-hidden').text().trim(),
    'Show more about this test',
    'custom "see more" a11y text is correct'
  );

  this.$('button').click();

  assert.equal(
    this.$('.truncate-multiline--visually-hidden').text().trim(),
    'Show less about this test',
    'custom "see less" a11y text is correct'
  );
});

test('specifying equal button and a11y texts works', function(assert) {
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline seeMoreButtonText="click me" seeMoreButtonA11yText="click me" seeLessButtonText="then click me" seeLessButtonA11yText="then click me" text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  assert.equal(
    this.$('.truncate-multiline--button').text().trim(),
    'click me',
    'custom "see more" text is correct'
  );

  assert.equal(
    this.$('.truncate-multiline--visually-hidden').length,
    0,
    'custom "see more" a11y text is not present'
  );

  this.$('button').click();

  assert.equal(
    this.$('.truncate-multiline--button').text().trim(),
    'then click me',
    'custom "see less" text is correct'
  );

  assert.equal(
    this.$('.truncate-multiline--visually-hidden').length,
    0,
    'custom "see less" a11y text is not present'
  );
});

test('the button is hidden if the text isn\'t long enough to truncate', function(assert) {
  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  const $hiddenButton = this.$('.truncate-multiline--button-hidden');
  assert.equal(
    this.$('truncate-multiline--button').length,
    0,
    'button class is not applied'
  );
  assert.equal(
    $hiddenButton.length,
    1,
    'button-hidden class is applied'
  );
  assert.equal(
    $hiddenButton.text().trim(),
    '',
    'button contains no text'
  );
});

test('clicking the button toggles full text', function(assert) {
  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  const $component = this.$('.truncate-multiline--truncation-target').parent();
  assert.equal(
    this.$('.truncate-multiline--truncation-target').children().length,
    3,
    'truncated before clicking button'
  );

  this.$('button').click();

  assert.equal(
    $component[0].firstChild.wholeText.trim(),
    'supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious',
    'not truncated after clicking button'
  );

  this.$('button').click();

  assert.equal(
    this.$('.truncate-multiline--truncation-target').children().length,
    3,
    'truncated after clicking button again'
  );
});

test('truncation can be controlled externally via the truncate attribute', function(assert) {
  // do truncate
  this.set('myTruncate', true);

  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline truncate=myTruncate text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  const $component = this.$('.truncate-multiline--truncation-target').parent();
  assert.equal(
    this.$('.truncate-multiline--truncation-target').children().length,
    3,
    'truncation when myTruncate=true'
  );

  // don't truncate
  this.set('myTruncate', false);

  assert.equal(
    $component[0].firstChild.wholeText.trim(),
    'supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious',
    'no truncation when myTruncate=false'
  );

  // do truncate again to ensure it works
  this.set('myTruncate', true);

  assert.equal(
    this.$('.truncate-multiline--truncation-target').children().length,
    3,
    'truncation again when myTruncate=true'
  );
});

test('passing showSeeMoreButton=false hides the "see more" button', function(assert) {
  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline showSeeMoreButton=false text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  const $hiddenButton = this.$('.truncate-multiline--button-hidden');
  assert.equal(
    this.$('truncate-multiline--button').length,
    0,
    'button class is not applied'
  );
  assert.equal(
    $hiddenButton.length,
    1,
    'button-hidden class is applied'
  );
  assert.equal(
    $hiddenButton.text().trim(),
    '',
    'button contains no text'
  );
});

test('passing showSeeLessButton=false hides the "see less" button', function(assert) {
  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline showSeeLessButton=false text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  this.$('button').click();

  const $hiddenButton = this.$('.truncate-multiline--button-hidden');
  assert.equal(
    this.$('truncate-multiline--button').length,
    0,
    'button class is not applied'
  );
  assert.equal(
    $hiddenButton.length,
    1,
    'button-hidden class is applied'
  );
  assert.equal(
    $hiddenButton.text().trim(),
    '',
    'button contains no text'
  );
});

test('passing showButton=false hides both buttons', function(assert) {
  this.set('myTruncate', true);

  // Template block usage:
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline truncate=myTruncate showButton=false text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  let $hiddenButton = this.$('.truncate-multiline--button-hidden');
  assert.equal(
    this.$('truncate-multiline--button').length,
    0,
    'button class is not applied'
  );
  assert.equal(
    $hiddenButton.length,
    1,
    'button-hidden class is applied'
  );
  assert.equal(
    $hiddenButton.text().trim(),
    '',
    'button contains no text'
  );

  this.set('myTruncate', false);

  $hiddenButton = this.$('.truncate-multiline--button-hidden');
  assert.equal(
    this.$('truncate-multiline--button').length,
    0,
    'button class is not applied'
  );
  assert.equal(
    $hiddenButton.length,
    1,
    'button-hidden class is applied'
  );
  assert.equal(
    $hiddenButton.text().trim(),
    '',
    'button contains no text'
  );
});

test('resizing triggers truncation recompute', function(assert) {
  // Template block usage:
  this.render(hbs`
    <div id="truncate-multiline--test-container" style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  // verify initial truncation
  let $truncationTarget = this.$('.truncate-multiline--truncation-target');
  let $truncationChunks = $truncationTarget.children();
  assert.ok(
    $truncationTarget,
    'the truncation target exists'
  );
  assert.equal(
    $truncationChunks.length,
    3,
    'text is truncated into chunks (default 3)'
  );

  // change container sizing
  this.$('#truncate-multiline--test-container')[0].style.width = '540px';

  // trigger resize event
  window.dispatchEvent(new CustomEvent('resize'));

  // verify container size changed
  assert.equal(this.$('#truncate-multiline--test-container')[0].style.width, '540px', 'the container was resized');

  $truncationTarget = this.$('.truncate-multiline--truncation-target');
  $truncationChunks = $truncationTarget.children();
  assert.ok(
    $truncationTarget,
    'the truncation target exists'
  );
  assert.equal(
    $truncationChunks.length,
    2,
    'text is truncated into fewer chunks (due to expanded width)'
  );
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

  let $truncationTarget = this.$('.truncate-multiline--truncation-target').clone();
  $truncationTarget.find('.truncate-multiline--button').remove();
  assert.equal(
    $truncationTarget.text().trim(),
    'supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious',
    'original text is rendered'
  );

  this.set('textToTruncate', "supercalifragilisticexpialidocious");

  $truncationTarget = this.$('.truncate-multiline--truncation-target').clone();
  assert.equal(
    $truncationTarget.text().trim(),
    'supercalifragilisticexpialidocious',
    'new text is rendered'
  );
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

  let $truncationTarget = this.$('.truncate-multiline--truncation-target');
  assert.equal(
    $truncationTarget.children().length,
    2,
    'text is rendered into original number of chunks'
  );

  this.set('lineToTruncate', 3);

  $truncationTarget = this.$('.truncate-multiline--truncation-target');
  assert.equal(
    $truncationTarget.children().length,
    3,
    'new number of chunks is respected'
  );
});

test('<BR>s are replaced with spaces in truncated output', function(assert) {
  assert.expect(1);

  this.set('lineToTruncate', 1);
  this.set('text', Ember.String.htmlSafe('supercalifragilisticexpialidocious<br><br>supercalifragilisticexpialidocious<br>supercalifragilisticexpialidocious'));

  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline
        text=text
        lines=lineToTruncate
      }}
    </div>
  `);

  let $truncationTarget = this.$('.truncate-multiline--last-line');
  assert.equal(
    $truncationTarget[0].innerHTML,
    'supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious'
  );
});

test('SafeStrings work as button text', function(assert) {
  assert.expect(2);

  this.set('lineToTruncate', 1);
  this.set('text', 'supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious');
  this.set('buttonText', Ember.String.htmlSafe('see <i>more</i>'));
  this.set('a11yText', Ember.String.htmlSafe(' ' + this.get('buttonText') + ' '));

  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline
        text=text
        lines=lineToTruncate
        seeMoreButtonText=buttonText
        seeMoreButtonA11yText=a11yText
      }}
    </div>
  `);

  let $toggleButton = this.$('.truncate-multiline--button');
  assert.equal(
    $toggleButton[0].innerHTML.trim(),
    'see <i>more</i>',
    'SafeString is rendered as button text'
  );
  assert.notOk(
    $toggleButton.find('.truncate-multiline--visually-hidden')[0],
    'a11y text not rendered b/c it matches display text'
  );
});
