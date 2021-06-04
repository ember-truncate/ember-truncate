import { htmlSafe } from '@ember/template';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find, triggerEvent } from '@ember/test-helpers';
import { guidFor } from '@ember/object/internals';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | truncate-multiline', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) =>
      this.actions[actionName].apply(this, args);

    // reset zoom on testing container to fix discrepancy in chrome
    document.querySelector(
      '#ember-testing-container #ember-testing'
    ).style.zoom = 1;
  });

  hooks.afterEach(function () {
    // undo zoom reset
    document.querySelector(
      '#ember-testing-container #ember-testing'
    ).style.zoom = null;
  });

  test('inline form works', async function (assert) {
    await render(
      hbs`
      <div style="width: 362px; font: 16px sans-serif;">
        {{truncate-multiline
          text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"
        }}
      </div>`
    );

    const truncationTarget = find('.truncate-multiline--truncation-target');
    const truncationChunks = truncationTarget.children;
    const lastChunkWrapper = [...truncationChunks].slice(-1);
    const lastChunkEtc = lastChunkWrapper[0].children;
    assert.ok(truncationTarget, 'the truncation target exists');
    assert.equal(
      truncationChunks.length,
      3,
      'text is truncated into chunks (default 3)'
    );
    assert.ok(
      [...truncationChunks]
        .slice(0, 2)
        .every(
          (chunk) =>
            chunk.innerText.trim() === 'supercalifragilisticexpialidocious'
        ),
      'first chunks contain expected text'
    );
    assert
      .dom(lastChunkWrapper[0])
      .hasClass(
        'truncate-multiline--last-line-wrapper',
        'last-line-wrapper class is applied to last chunk wrapper'
      );
    assert.equal(
      lastChunkEtc.length,
      2,
      'last chunk wrapper contains two elements'
    );
    assert
      .dom(lastChunkEtc[0])
      .hasClass(
        'truncate-multiline--last-line',
        'first element in last chunk wrapper is the last chunk'
      );
    assert.equal(
      lastChunkEtc[0].innerText,
      'supercalifragilisticexpialidocious supercalifragilisticexpialidocious',
      'last chunk contains expected text'
    );
    assert.ok(
      lastChunkEtc[1].tagName.toLowerCase() === 'button' &&
        lastChunkEtc[1].classList.contains('truncate-multiline--button'),
      'second element in last chunk wrapper is the expand button'
    );
  });

  test('block form works', async function (assert) {
    await render(hbs`
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

    const truncationTarget = find('.truncate-multiline--truncation-target');
    const truncationChunks = truncationTarget.children;
    const lastChunkWrapper = [...truncationChunks].slice(-1);
    const lastChunkEtc = lastChunkWrapper[0].children;
    assert.ok(truncationTarget, 'the truncation target exists');
    assert.equal(
      truncationChunks.length,
      3,
      'text is truncated into chunks (default 3)'
    );
    assert.ok(
      [...truncationChunks]
        .slice(0, 2)
        .every(
          (chunk) =>
            chunk.innerText.trim() === 'supercalifragilisticexpialidocious'
        ),
      'first chunks contain expected text'
    );
    assert
      .dom(lastChunkWrapper[0])
      .hasClass(
        'truncate-multiline--last-line-wrapper',
        'last-line-wrapper class is applied to last chunk wrapper'
      );
    assert.equal(
      lastChunkEtc.length,
      2,
      'last chunk wrapper contains two elements'
    );
    assert
      .dom(lastChunkEtc[0])
      .hasClass(
        'truncate-multiline--last-line',
        'first element in last chunk wrapper is the last chunk'
      );
    assert.equal(
      lastChunkEtc[0].innerText,
      'supercalifragilisticexpialidocious supercalifragilisticexpialidocious',
      'last chunk contains expected text'
    );
    assert.ok(
      lastChunkEtc[1].tagName.toLowerCase() === 'button' &&
        lastChunkEtc[1].classList.contains('truncate-multiline--button'),
      'second element in last chunk wrapper is the expand button'
    );
  });

  test('block form with nested elements works', async function (assert) {
    await render(hbs`
      <div style="width: 362px; font: 16px sans-serif;">
        {{#truncate-multiline as |tm|}}
          {{#tm.target}}
            <b><i>supercalifragilisticexpialidocious supercalifragilisticexpialidocious</i></b> <i>a <b>e</b> i</i> supercalifragilisticexpialidocious supercalifragilisticexpialidocious
          {{/tm.target}}
        {{/truncate-multiline}}
      </div>
    `);

    const truncationTarget = find('.truncate-multiline--truncation-target');
    const truncationChunks = truncationTarget.children;
    assert.equal(
      truncationChunks[0].innerHTML.trim(),
      '<b><i>supercalifragilisticexpialidocious </i></b>',
      'first chunk contains expected html'
    );
    assert.equal(
      truncationChunks[1].innerHTML.trim(),
      '<b><i>supercalifragilisticexpialidocious</i></b> <i>a <b>e</b> i</i>',
      'second chunk contains expected html'
    );
  });

  test('specifying a different number of lines works', async function (assert) {
    await render(hbs`
      <div style="width: 362px; font: 16px sans-serif;">
        {{truncate-multiline lines=2 text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
      </div>
    `);

    const truncationTarget = find('.truncate-multiline--truncation-target');
    const truncationChunks = truncationTarget.children;
    const lastChunkWrapper = [...truncationChunks].slice(-1);
    const lastChunkEtc = lastChunkWrapper[0].children;
    assert.equal(
      truncationChunks.length,
      2,
      'text is truncated into specified number of chunks'
    );
    assert.equal(
      truncationChunks[0].innerText,
      'supercalifragilisticexpialidocious',
      'first chunk contains expected text'
    );
    assert.equal(
      lastChunkEtc[0].innerText,
      'supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious',
      'last chunk contains expected text'
    );
  });

  test("the button is hidden if the text isn't long enough to truncate", async function (assert) {
    await render(hbs`
      <div style="width: 362px; font: 16px sans-serif;">
        {{truncate-multiline text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
      </div>
    `);

    assert
      .dom('truncate-multiline--button')
      .doesNotExist('the button is not rendered');
  });

  test('clicking the button toggles full text (inline)', async function (assert) {
    const uuid = this.set('uuid', guidFor({}));
    await render(hbs`
      <div style="width: 362px; font: 16px sans-serif;">
        {{truncate-multiline id=uuid text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
      </div>
    `);

    assert.equal(
      find('.truncate-multiline--truncation-target').children.length,
      3,
      'truncated before clicking button'
    );

    await click('button');

    assert.equal(
      find(`#${uuid}`).firstChild.wholeText.trim(),
      'supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious',
      'not truncated after clicking button'
    );

    await click('button');

    assert.equal(
      find('.truncate-multiline--truncation-target').children.length,
      3,
      'truncated after clicking button again'
    );
  });

  test('clicking the button toggles full text (block)', async function (assert) {
    const uuid = this.set('uuid', guidFor({}));
    await render(hbs`
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

    assert.equal(
      find('.truncate-multiline--truncation-target').children.length,
      3,
      'truncated before clicking button'
    );

    await click('button');

    assert.equal(
      find(`#${uuid}`).firstChild.wholeText.trim(),
      'supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious',
      'not truncated after clicking button'
    );

    await click('button');

    assert.equal(
      find('.truncate-multiline--truncation-target').children.length,
      3,
      'truncated after clicking button again'
    );
  });

  test('truncation can be controlled externally via the truncate attribute', async function (assert) {
    // do truncate
    this.set('myTruncate', true);

    const uuid = this.set('uuid', guidFor({}));
    await render(hbs`
      <div style="width: 362px; font: 16px sans-serif;">
        {{truncate-multiline id=uuid truncate=myTruncate text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
      </div>
    `);

    assert.equal(
      find('.truncate-multiline--truncation-target').children.length,
      3,
      'truncation when myTruncate=true'
    );

    // don't truncate
    this.set('myTruncate', false);

    assert.equal(
      find(`#${uuid}`).firstChild.wholeText.trim(),
      'supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious',
      'no truncation when myTruncate=false'
    );

    // do truncate again to ensure it works
    this.set('myTruncate', true);

    assert.equal(
      find('.truncate-multiline--truncation-target').children.length,
      3,
      'truncation again when myTruncate=true'
    );
  });

  test('resizing triggers truncation recompute', async function (assert) {
    await render(hbs`
      <div id="truncate-multiline--test-container" style="width: 362px; font: 16px sans-serif;">
        {{truncate-multiline text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
      </div>
    `);

    // verify initial truncation
    let truncationTarget = find('.truncate-multiline--truncation-target');
    let truncationChunks = truncationTarget.children;
    assert.ok(truncationTarget, 'the truncation target exists');
    assert.equal(
      truncationChunks.length,
      3,
      'text is truncated into chunks (default 3)'
    );

    // change container sizing
    find('#truncate-multiline--test-container').style.width = '800px';

    // trigger resize event
    await triggerEvent(window, 'resize');

    // verify container size changed
    assert.equal(
      find('#truncate-multiline--test-container').style.width,
      '800px',
      'the container was resized'
    );

    truncationTarget = find('.truncate-multiline--truncation-target');
    truncationChunks = truncationTarget.children;
    assert.ok(truncationTarget, 'the truncation target exists');
    assert.equal(
      truncationChunks.length,
      2,
      'text is truncated into fewer chunks (due to expanded width)'
    );
  });

  test('clicking the see more/less button fires user defined actions', async function (assert) {
    assert.expect(3);

    let args = [];

    this.actions.assertOnExpand = () =>
      assert.ok(true, 'onExpand action triggered');
    this.actions.assertOnCollapse = () =>
      assert.ok(true, 'onCollapse action triggered');
    this.actions.pushOnToggle = (isTruncated) => args.push(isTruncated);

    await render(hbs`
      <div id="truncate-multiline--test-container" style="width: 362px; font: 16px sans-serif;">
        {{truncate-multiline
          onExpand=(action "assertOnExpand")
          onCollapse=(action "assertOnCollapse")
          onToggle=(action "pushOnToggle")
          text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"}}
      </div>
    `);

    await click('button');
    await click('button');

    assert.deepEqual(
      args,
      [false, true],
      'onToggle action triggered (twice) with the expected arguments'
    );
  });

  test("changing the component's text changes the resulting markup", async function (assert) {
    assert.expect(2);

    this.set(
      'textToTruncate',
      'supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious'
    );

    await render(hbs`
      <div style="width: 362px; font: 16px sans-serif;">
        {{truncate-multiline text=textToTruncate}}
      </div>
    `);

    let truncationTarget = find(
      '.truncate-multiline--truncation-target'
    ).cloneNode(true);
    truncationTarget.querySelector('.truncate-multiline--button').remove();
    assert.equal(
      truncationTarget.innerText.trim(),
      'supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious',
      'original text is rendered'
    );

    this.set('textToTruncate', 'supercalifragilisticexpialidocious');

    truncationTarget = find('.truncate-multiline--truncation-target').cloneNode(
      true
    );
    assert.equal(
      truncationTarget.innerText.trim(),
      'supercalifragilisticexpialidocious',
      'new text is rendered'
    );
  });

  test("changing the component's lines changes the resulting markup", async function (assert) {
    assert.expect(2);

    this.set('lineToTruncate', 2);

    await render(hbs`
      <div style="width: 362px; font: 16px sans-serif;">
        {{truncate-multiline
          text="supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious"
          lines=lineToTruncate
        }}
      </div>
    `);

    let truncationTarget = find('.truncate-multiline--truncation-target');
    assert.equal(
      truncationTarget.children.length,
      2,
      'text is rendered into original number of chunks'
    );

    this.set('lineToTruncate', 3);

    truncationTarget = find('.truncate-multiline--truncation-target');
    assert.equal(
      truncationTarget.children.length,
      3,
      'new number of chunks is respected'
    );
  });

  test('<BR>s are replaced with spaces in truncated output', async function (assert) {
    assert.expect(1);

    this.set('lineToTruncate', 1);
    this.set(
      'text',
      htmlSafe(
        'supercalifragilisticexpialidocious<br><br>supercalifragilisticexpialidocious<br>supercalifragilisticexpialidocious'
      )
    );

    await render(hbs`
      <div style="width: 362px; font: 16px sans-serif;">
        {{truncate-multiline
          text=text
          lines=lineToTruncate
        }}
      </div>
    `);

    let truncationTarget = find('.truncate-multiline--last-line');
    assert.equal(
      truncationTarget.innerHTML.trim(),
      'supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious'
    );
  });

  test('setting a custom see more/less text works', async function (assert) {
    assert.expect(1);

    this.set('lineToTruncate', 1);
    this.set('seeMoreText', 'Open for a surprise!');
    this.set('seeLessText', 'Surprise over :(');
    this.set(
      'text',
      'supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious'
    );

    await render(hbs`
      {{truncate-multiline
        text=text
        seeMoreText=seeMoreText
        seeLessText=seeLessText
        lines=lineToTruncate
      }}
    `);

    let seeMoreButton = find('.truncate-multiline--button');

    assert.equal(seeMoreButton.innerHTML.trim(), 'Open for a surprise!');
  });
});
