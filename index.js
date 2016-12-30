'use strict';

// Dependencies
const ace = require('brace');
const libob = require('libobject');
require('brace/mode/json');
require('brace/theme/solarized_dark');

/*
 *
 * initialize ace editor
 * @name init
 *
 */
exports.init = (scope, state, args, data, next) => {
    let selector = args.selector || '.editor';

    // setup editor
    state.options = args.options || {};
    state.editor = ace.edit(document.querySelector(selector));
    state.editor.setOptions(state.options);

    state.editor.setShowPrintMargin(false);
    state.editor.getSession().setMode('ace/mode/json');

    // hardcoded theme
    //state.editor.setTheme('ace/theme/solarized_dark');

    // listen for events
    let events = args.events || [];
    events.forEach(eventName => {
        state.editor.on(eventName, event => {
            // TODO
        });
    });

    next(null, data);
};

/*Data: {
    needs: {
        content: "string"
    }
}*/
exports.set = (scope, state, args, data, next) => {

    if (!state.editor) {
        return next(new Error('Flow-ace.set: Editor not found.'));
    }

    let content = libob.path.get(args, data);

    if (!content) {
        return next(new Error('Flow-ace.set: No data to set.'));
    }

    state.editor.setValue(content, 1);

    next(null, data);
};

exports.setOptions = (scope, state, args, data, next) => {

    if (!state.editor) {
        return next(new Error('Flow-ace.set: Editor not found.'));
    }

    let options = data.options || args.options || state.options;
    state.options = options;
    state.editor.setOptions(state.options);

    next(null, data);
};

exports.get = (scope, state, args, data, next) => {

    if (!state.editor) {
        return next(new Error('Flow-ace.set: Editor not found.'));
    }

    libob.path.set(args, data, state.editor.getValue());
    next(null, data);
};
