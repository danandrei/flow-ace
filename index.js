'use strict';

// Dependencies
const ace = require('brace');
require('brace/mode/json');

/*
 *
 * initialize ace editor instance
 * @name init
 *
 */
exports.init = (scope, inst, args, data, next) => {
    console.log(scope, inst, args);
    next(null, data);
};
