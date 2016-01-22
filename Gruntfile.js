/*
 * grunt-minjson
 * https://github.com/shama/grunt-minjson
 *
 * Copyright (c) 2016 Kyle Robinson Young
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    minjson: {
      all: {
        files: {
          'test/expected/one.min.json': ['test/fixtures/one.json'],
          'test/expected/all.min.json': ['test/fixtures/*.json']
        }
      },
      fail: {
        files: {
          'test/expected/fail.min.json': ['test/fixtures/failure/fail.json']
        }
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    }
  });
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint', 'minjson:all']);
  grunt.registerTask('fail', ['minjson:fail']);
};
