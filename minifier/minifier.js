const minify = require('./node_modules/@node-minify/core');
const sqwish = require('./node_modules/@node-minify/sqwish');
const babel = require('./node_modules/@node-minify/babel-minify');
const fs = require('fs');

const JS_PATH = './../chao.min.js';
const CSS_PATH = './../chao.min.css';
const LICENSE_PATH = './../LICENSE';

console.info('Minifier of JS files have been started.');
minify({
    compressor: babel,
    input: './../src/js/**/*.js',
    output: JS_PATH,
    type: 'js',
    sync: true,
    callback: function(err, min) {
        if (err === null) {
            let license = fs.readFileSync(LICENSE_PATH);
            let content = fs.readFileSync(JS_PATH);
            fs.writeFileSync(JS_PATH, `/** ${license} */\n${content}`);
            console.info(`JS minifier finished with success result.`);
        } else {
            console.error(err);
        }
    }
});

console.info('Minifier of CSS files have been started.');
minify({
    compressor: sqwish,
    input: './../src/css/**/*.css',
    output: CSS_PATH,
    type: 'css',
    callback: function(err, min) {
        if (err === null) {
            let license = fs.readFileSync('./../LICENSE');
            let content = fs.readFileSync(CSS_PATH);
            fs.writeFileSync(CSS_PATH, `/** ${license} */\n${content}`);
            console.info(`CSS minifier finished with success result`);
        } else {
            console.error(err);
        }
    }
});