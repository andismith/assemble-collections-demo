/* indent: 2 */
module.exports = function (grunt) {
  'use strict';

  var FILES = {
    package: './package.json'
  };

  var PATHS = {
    bonnet: './src/bonnet/',
    content: './src/content/',
    dist: './dist/',
    temp: './tmp'
  };
  var SERVER_PORT = 3003;

  grunt.initConfig({
    pkg: grunt.file.readJSON(FILES.package),

    /* assemble templating */
    assemble: {
      options: {
        helpers: PATHS.bonnet + '/helpers/**/*.js',
        layout: 'main.hbs',
        layoutdir: PATHS.bonnet + '/layouts/'
      },
      posts: {
        options: {
          collections: [{
            name: 'post',
            sortby: 'posted',
            sortorder: 'descending'
          }]
        },
        files: [{
          cwd: PATHS.content,
          dest: PATHS.dist,
          expand: true,
          src: ['**/*.hbs', '!_pages/**/*.hbs']
        }, {
          cwd: PATHS.content + '_pages/',
          dest: PATHS.dist,
          expand: true,
          src: ['**/*.hbs']
        }]
      }
    },

    /* remove files from folder */
    clean: {
      dist: './dist/'
    },

    /* create a local server */
    connect: {
      dev: {
        options: {
          port: SERVER_PORT,
          base: './dist/',
          keepalive: true
        }
      }
    }

  });

  /* load every plugin in package.json */
  grunt.loadNpmTasks('assemble');
  require('matchdep').filter('grunt-*').forEach(grunt.loadNpmTasks);

  /* grunt tasks */
  grunt.registerTask('run', ['connect']);
  grunt.registerTask('dev', ['clean', 'assemble']);
  grunt.registerTask('default', ['dev', 'run']);

};