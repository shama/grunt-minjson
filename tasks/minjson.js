/*
 * grunt-minjson
 * https://github.com/shama/grunt-minjson
 *
 * Copyright (c) 2012 Kyle Robinson Young
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('minjson', 'Minify json files.', function() {
    var helpers = require('grunt-lib-contrib').init(grunt);

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);

    this.files.forEach(function(fileObj) {
      var errors = [];
      var files = grunt.file.expand({nonull: true}, fileObj.src);

      var src = files.map(function(filepath) {
        var data = grunt.file.read(filepath);
        try {
          // minify json
          return JSON.stringify(JSON.parse(data));
        } catch (err) {
          errors.push(err.message + ' in ' + filepath);
          return '';
        }
      });

      if (errors.length < 1) {
        // wrap concat'd files in brackets
        if (files.length > 1) { src = '[' + src + ']'; }
        grunt.file.write(fileObj.dest, src);
        grunt.log.writeln('File "' + fileObj.dest + '" created.');
      } else {
        // display errors
        errors.forEach(function(msg) { grunt.log.error(msg); });
      }

    });
  });

};
