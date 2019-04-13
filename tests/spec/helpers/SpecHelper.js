const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.window = (new JSDOM(`...`)).window;
global.jQuery = global.$ = require("jquery");
const jasmineJquery = require('jasmine-jquery');

var ChaoLibrary = require('../../../chao.min.js');