# Ember Truncate

[![Build Status](https://travis-ci.org/nickiaconis/ember-truncate.svg?branch=master)](https://travis-ci.org/nickiaconis/ember-truncate)
[![npm version](https://badge.fury.io/js/ember-truncate.svg)](http://badge.fury.io/js/ember-truncate)

This addon provides a component for truncating blocks of text.

## Installation

* `npm install --save-dev ember-truncate`

## Usage

To get started, place the `truncate-multiline` component in one of your templates and provide a string to the `text` attribute.

```handlebars
{{truncate-multiline text="Long text to truncate."}}
```

You can also use the block form instead of supplying the `text` attribute. The block form supports nested DOM nodes.

```handlebars
{{#truncate-multiline}}
  Long text to truncate with <em><strong>really</strong> important</em> formatting.
{{/truncate-multiline}}
```

The number of lines at which the component truncates can be changed by setting the `lines` attribute. The default is 3 lines.

```handlebars
{{truncate-multiline text="Long text to truncate." lines=5}}
```

Other attributes are available for advanced use. See the documentation in the source code for more details.

```handlebars
{{truncate-multiline text="Long text to truncate." truncate=booleanInParent showButton=false}}

{{truncate-multiline text="Long text to truncate." buttonText="Show More" onExpand=(action "doSomeCoolThing")}}
```

## Contributing

* `git clone` this repository
* `npm install`
* `bower install`

## Running Tests

* `ember test`
* `ember test --server`
