module.exports = function(grunt) {
    grunt.uri = './';
    grunt.uriStatic = 'static/';
    grunt.uriDist = grunt.uriStatic + 'dist/';
    grunt.uriSrc = 'assets/css/';
    grunt.uriSrcJs = 'assets/js/';
    grunt.uriSrcHtml = grunt.uri;
    grunt.uriTask = grunt.uri + 'script/grunt/';

    // Our task object where we'll store our configuration.
    var tasks = {};
    tasks.concat = {};

      // Concatenation Tasks
          tasks = require(grunt.uriTask + 'css-concat.js')(grunt, tasks);
          tasks = require(grunt.uriTask + 'js-concat.js')(grunt, tasks);

          // Minify Tasks
          tasks = require(grunt.uriTask + 'css-minify.js')(grunt, tasks);
          tasks = require(grunt.uriTask + 'html-minify.js')(grunt, tasks);
          tasks = require(grunt.uriTask + 'js-minify.js')(grunt, tasks);

    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        watch: {
            files: ['assets/css/*.scss'],
            tasks: ['sass']
        },

        sass : {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
                    "assets/css/style.css": [
                    "assets/css/style.scss"
                    ],
                
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('minify', ['cssmin', 'htmlmin', 'uglify']);
    grunt.registerTask('default', ['lint', 'concat', 'minify']);
};