const minify = require('./node_modules/@node-minify/core');
const sqwish = require('./node_modules/@node-minify/sqwish');
const babel = require('./node_modules/@node-minify/babel-minify');

console.info('Minifier of JS files have been started.');
minify({
    compressor: babel,
    input: './../src/js/**/*.js',
    output: './../chao.min.js',
    type: 'js',
    sync: true,
    callback: function(err, min) {
        if (err === null) {
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
    output: './../chao.min.css',
    type: 'css',
    callback: function(err, min) {
        if (err === null) {
            console.info(`CSS minifier finished with success result`);
        } else {
            console.error(err);
        }
    }
});