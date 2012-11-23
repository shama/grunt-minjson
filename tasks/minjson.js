/*
 * grunt-minjson
 * https://github.com/shama/grunt-minjson
 *
 * Copyright (c) 2012 Kyle Robinson Young
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  if (grunt.utils) {
    grunt.fatal('grunt-minjson is only compatible with Grunt v0.4.0+');
  }

  var JSON5 = require('json5');

  grunt.registerMultiTask('minjson', 'Minify and concat json files.', function() {
    var dest = this.file.dest;
    var src = [];
    var errors = [];

    this.file.src.forEach(function(filepath) {
      var data = grunt.file.read(filepath);
      try {
        // minify json
        src.push(JSON5.stringify(JSON5.parse(data)));
      } catch (err) {
        errors.push(err.message + ' in ' + filepath);
      }
    });

    if (errors.length < 1) {
      // wrap concat'd files in brackets
      if (src.length > 1) { src = '[' + src.join(',') + ']'; }
      else { src = src[0]; }
      grunt.file.write(dest, src);
      grunt.log.writeln('File "' + dest + '" created.');
    } else {
      // display errors
      errors.forEach(function(msg) { grunt.log.error(msg); });
    }
  });

};
