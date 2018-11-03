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

  return wait().then(() => {
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
});

test('block form works', function(assert) {
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{#truncate-multiline as |tm|}}
        {{#tm.target}}
          supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious
        {{/tm.target}}
        {{#tm.button}}
          see more
        {{/tm.button}}
      {{/truncate-multiline}}
    </div>
  `);

  return wait().then(() => {
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
});

test('block form with nested elements works', function(assert) {
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{#truncate-multiline as |tm|}}
        {{#tm.target}}
          <b><i>supercalifragilisticexpialidocious supercalifragilisticexpialidocious</i></b> <i>a <b>e</b> i</i> supercalifragilisticexpialidocious supercalifragilisticexpialidocious
        {{/tm.target}}
      {{/truncate-multiline}}
    </div>
  `);

  return wait().then(() => {
    const $truncationTarget = this.$('.truncate-multiline--truncation-target');
    const $truncationChunks = $truncationTarget.children();
    assert.equal(
      $truncationChunks[0].innerHTML.trim(),
      '<b><i>supercalifragilisticexpialidocious </i></b>',
      'first chunk contains expected html'
    );
    assert.equal(
      $truncationChunks[1].innerHTML.trim(),
      '<b><i>supercalifragilisticexpialidocious</i></b> <i>a <b>e</b> i</i>',
      'second chunk contains expected html'
    );
  });
});

test('specifying a different number of lines works', function(assert) {
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline lines=2 text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  return wait().then(() => {
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
});

test('inline form without enough text to truncate works', function(assert) {
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  return wait().then(() => {
    const $truncationTarget = this.$('.truncate-multiline--truncation-target');
    const $truncationChunks = $truncationTarget.children();
    const $lastChunkWrapper = $truncationChunks.slice(-1);

    assert.equal(
      this.$('truncate-multiline--button').length,
      0,
      'the button is hidden if the text isn\'t long enough to truncate'
    );
    assert.notOk(
      $lastChunkWrapper.hasClass('truncate-multiline--last-line-wrapper'),
      'last chunk is not wrapped if truncation was not needed'
    );
  });
});

test('clicking the button toggles full text (inline)', function(assert) {
  const uuid = this.set('uuid', Ember.generateGuid());
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline id=uuid text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  return wait().then(() => {
    assert.equal(
      this.$('.truncate-multiline--truncation-target').children().length,
      3,
      'truncated before clicking button'
    );

    this.$('button').click();

    return wait();
  }).then(() => {
    assert.equal(
      this.$(`#${uuid}`)[0].firstChild.wholeText.trim(),
      'supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious',
      'not truncated after clicking button'
    );

    this.$('button').click();

    return wait();
  }).then(() => {
    assert.equal(
      this.$('.truncate-multiline--truncation-target').children().length,
      3,
      'truncated after clicking button again'
    );
  });
});

test('clicking the button toggles full text (block)', function(assert) {
  const uuid = this.set('uuid', Ember.generateGuid());
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{#truncate-multiline id=uuid as |tm|}}
        {{#tm.target}}
          supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious
        {{/tm.target}}
        {{#tm.button}}
          see more
        {{/tm.button}}
      {{/truncate-multiline}}
    </div>
  `);

  return wait().then(() => {
    assert.equal(
      this.$('.truncate-multiline--truncation-target').children().length,
      3,
      'truncated before clicking button'
    );

    this.$('button').click();

    return wait();
  }).then(() => {
    assert.equal(
      this.$(`#${uuid}`)[0].firstChild.wholeText.trim(),
      'supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious',
      'not truncated after clicking button'
    );

    this.$('button').click();

    return wait();
  }).then(() => {
    assert.equal(
      this.$('.truncate-multiline--truncation-target').children().length,
      3,
      'truncated after clicking button again'
    );
  });
});

test('truncation can be controlled externally via the truncate attribute', function(assert) {
  // do truncate
  this.set('myTruncate', true);

  const uuid = this.set('uuid', Ember.generateGuid());
  this.render(hbs`
    <div style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline id=uuid truncate=myTruncate text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  return wait().then(() => {
    assert.equal(
      this.$('.truncate-multiline--truncation-target').children().length,
      3,
      'truncation when myTruncate=true'
    );

    // don't truncate
    this.set('myTruncate', false);

    return wait();
  }).then(() => {
    assert.equal(
      this.$(`#${uuid}`)[0].firstChild.wholeText.trim(),
      'supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious',
      'no truncation when myTruncate=false'
    );

    // do truncate again to ensure it works
    this.set('myTruncate', true);

    return wait();
  }).then(() => {
    assert.equal(
      this.$('.truncate-multiline--truncation-target').children().length,
      3,
      'truncation again when myTruncate=true'
    );
  });
});

test('resizing triggers truncation recompute', function(assert) {
  this.render(hbs`
    <div id="truncate-multiline--test-container" style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
    </div>
  `);

  return wait().then(() => {
    // verify initial truncation
    const $truncationTarget = this.$('.truncate-multiline--truncation-target');
    const $truncationChunks = $truncationTarget.children();
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
    this.$('#truncate-multiline--test-container')[0].style.width = '800px';

    // trigger resize event
    window.dispatchEvent(new CustomEvent('resize'));

    return wait();
  }).then(() => {
    // verify container size changed
    assert.equal(this.$('#truncate-multiline--test-container')[0].style.width, '800px', 'the container was resized');

    const $truncationTarget = this.$('.truncate-multiline--truncation-target');
    const $truncationChunks = $truncationTarget.children();
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
});

test('clicking the see more/less button fires user defined actions', function(assert) {
  assert.expect(3);

  let args = [];

  this.on('assertOnExpand', () => assert.ok(true, 'onExpand action triggered'));
  this.on('assertOnCollapse', () => assert.ok(true, 'onCollapse action triggered'));
  this.on('pushOnToggle', (isTruncated) => args.push(isTruncated));

  this.render(hbs`
    <div id="truncate-multiline--test-container" style="width: 362px; font: 16px sans-serif;">
      {{truncate-multiline
        onExpand=(action "assertOnExpand")
        onCollapse=(action "assertOnCollapse")
        onToggle=(action "pushOnToggle")
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
    assert.deepEqual(args, [false, true], 'onToggle action triggered (twice) with the expected arguments');
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
    $truncationTarget[0].innerHTML.trim(),
    'supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious'
  );
});
