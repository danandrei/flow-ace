'use strict';

// Dependencies
const ace = require('brace');
require('brace/mode/json');
require('brace/theme/solarized_dark');


function Ace (args) {
    args = args || {};
    let selector = args.selector || '.editor';

    // setup editor
    this.options = args.options || {};
    this.editor = ace.edit(document.querySelector(selector));
    this.editor.setOptions(this.options);

    this.editor.setShowPrintMargin(false);
    this.editor.getSession().setMode('ace/mode/json');
}

Ace.prototype.set = function (value) {

    if (typeof value !== 'string') {
        value = '';
    }

    if (!this.editor) {
        return;
    }

    this.editor.setValue(value, 1);
};

Ace.prototype.setOptions = function (options) {
    options = options || {};

    if (!this.editor) {
        return;
    }

    this.options = options;
    this.editor.setOptions(options);
};

Ace.prototype.get = function () {

    if (!this.editor) {
        return;
    }

    return this.editor.getValue();
};

module.exports = Ace;