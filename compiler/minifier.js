import minify from '@node-minify/core';
import gcc from '@node-minify/google-closure-compiler';
import yui from '@node-minify/yui';

console.info('Minifier of JS files have been started.');
minify({
    compressor: gcc,
    input: './../src/js/**/*.js',
    output: './../chao.min.js',
    type: 'js',
    sync: true,
    callback: function(err, min) {
        if (err === null) {
            console.info(`JS minifier finished with success result: ${min}.`);
        } else {
            console.error(err);
        }
    }
});

console.info('Minifier of CSS files have been started.');
minify({
    compressor: yui,
    input: './../src/css/**/*.css',
    output: './../chao.min.css',
    type: 'css',
    callback: function(err, min) {
        if (err === null) {
            console.info(`CSS minifier finished with success result: ${min} min.`);
        } else {
            console.error(err);
        }
    }
  });