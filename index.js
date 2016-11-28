'use strict';

// Dependencies
const ace = require('brace');
require('brace/mode/json');
require('brace/theme/solarized_dark');

/*
 *
 * initialize ace editor instance
 * @name init
 *
 */
exports.init = (scope, inst, args, data, next) => {
    let selector = args.selector || '.editor';

    // setup editor
    inst.options = args.options || {};
    let container = document.querySelectorAll(selector);
    inst.editor = ace.edit(container[0]);
    inst.editor.setOptions(inst.options);

    inst.editor.setShowPrintMargin(false);
    inst.editor.getSession().setMode('ace/mode/json');

    // hardcoded theme
    //inst.editor.setTheme('ace/theme/solarized_dark');

    // listen for events
    let events = args.events || [];
    events.forEach(eventName => {

        inst.editor.on(eventName, event => {
            // TODO
        });
    });

    next(null, data);
};

exports.set = (scope, inst, args, data, next) => {

    if (!inst.editor) {
        return next(new Error('Flow-ace.set: Editor not found.'));
    }

    let content = data.content;

    if (!content) {
        return next(new Error('Flow-ace.set: No data to set.'));
    }

    inst.editor.setValue(content, 1);

    next(null, data);
};

exports.setOptions = (scope, inst, args, data, next) => {

    if (!inst.editor) {
        return next(new Error('Flow-ace.set: Editor not found.'));
    }

    let options = data.options || args.options || inst.options;
    inst.options = options;
    inst.editor.setOptions(inst.options);

    next(null, data);
};

exports.get = (scope, inst, args, data, next) => {

    if (!inst.editor) {
        return next(new Error('Flow-ace.set: Editor not found.'));
    }

    let content = inst.editor.getValue();
    data.content = content
    next(null, data);
};