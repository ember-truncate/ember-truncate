# Ember Truncate

[![Build Status](https://travis-ci.org/nickiaconis/ember-truncate.svg?branch=master)](https://travis-ci.org/nickiaconis/ember-truncate)
[![npm version](https://badge.fury.io/js/ember-truncate.svg)](http://badge.fury.io/js/ember-truncate)

This addon provides a component for truncating text in an Ember application.

## Installation

* `npm install ember-truncate`

## Usage

To get started, place the `truncate-multiline` component in one of your templates and provide a string to the `text` attribute.

```handlebars
{{truncate-multiline text="Long text to truncate."}}
```

The block form offers customization beyond that of the inline form and support for nested DOM nodes. Instead of supplying the `text` attribute, render text or elements into the `target` component. Use the `button` component to customize the more/less button, or exclude it to remove the button entirely. The `isTruncated` property provides access to the current state of truncation.

```handlebars
{{#truncate-multiline as |tm|~}}
  {{#tm.target~}}
    Long text to truncate with <em><strong>really</strong> important</em> formatting.
  {{~/tm.target}}
  {{#if tm.neededTruncating}}
    {{#tm.button}}{{if tm.isTruncated "more" "less"}}{{/tm.button}}
  {{/if}}
{{~/truncate-multiline}}
```

NB: It is recommended that you use the [tilde `~` character to omit extra whitespace](http://handlebarsjs.com/expressions.html#whitespace-control) when using the block form.

### Attributes

The `truncate-multiline` component offers other functionality via attributes.

#### lines

The number of lines at which the component truncates can be changed by setting the `lines` attribute. The default is 3 lines.

```handlebars
{{truncate-multiline text="Long text to truncate." lines=5}}
```

#### truncate


Programmatically controls expanding/collapsing the text. This attribute is especially useful when the button is omitted.
```handlebars
{{#truncate-multiline truncate=booleanInParent as |tm|~}}
  {{#tm.target~}}
    Long text to truncate.
  {{~/tm.target}}
{{~/truncate-multiline}}
```

### Actions

The `truncate-multiline` component uses actions to signal change in truncation state.

#### onExpand

The `onExpand` action is triggered whenever the text is expanded.

```handlebars
{{truncate-multiline text="Long text to truncate." onExpand=(action "trackImpression")}}
```

#### onCollapse

The `onCollapse` action is triggered whenever the text is collapsed.

```handlebars
{{truncate-multiline text="Long text to truncate." onCollapse=(action "doSomeCoolThing")}}
```

#### onToggle

The `onToggle` action is triggered whenever the text is expanded or collapsed. The new truncation state is passed to the action: true for collapsed, false for expanded.

```handlebars
{{truncate-multiline text="Long text to truncate." onToggle=(action "updateTableOfContents")}}
```

## Contributing

* fork this repository
* `git clone` your fork
* `npm install`
* make changes
* `npm test` to verify tests pass for supported versions of Ember
* `git push` changes to your fork
* open a pull request against this repository

## Running Tests

* `ember test` runs tests against the version of Ember listed in `package.json`
* `ember test --server` livereloads tests in Chrome, making failrues easier to debug
* `npm test` runs tests against all supported versions of Ember
* `ember try:each` runs tests against the latest versions of Ember (in addition to the supported Ember versions)
