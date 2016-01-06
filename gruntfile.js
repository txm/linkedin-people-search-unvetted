module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');


  var banner = '/*n<%= pkg.name %> <%= pkg.version %> - <%= pkg.description %>';
      banner = 'n<%= pkg.repository.url %>nBuilt on ';
      banner = '<%= grunt.template.today("yyyy-mm-dd") %>n*/n';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['gruntfile.js', 'src/*.js', 'test/**/*.js'],
      options: {
        // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        },
        maxlen: 80,
        quotmark: 'single'
      }
      // dev: ['gruntfile.js', 'tests/*.js'],
      // app:  ['src/**/*.js']
      // grunt jshint:dev 

    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          // Optionally capture the reporter output to a file
          captureFile: 'results.txt', 
          // Optionally suppress output to standard out
          // (defaults to false)
          quiet: false,               
          // Optionally clear the require cache before running tests
          // (defaults false)
          clearRequireCache: false,
          require: 'coverage/blanket'
        },
        src: ['test/**/*.js']
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          // use the quiet flag to suppress the mocha console output
          quiet: true,
          // specify a destination file to capture the mocha
          // output (the quiet option does not suppress this)
          captureFile: 'coverage.html'
        },
        src: ['test/**/*.js']
      },
      watch: {
        js: {
          options: {
            spawn: false,
          },
          files: '**/*.js',
          tasks: ['default']
        }
      }
    },

    watch: {
      scripts: {
        files: ['gruntfile.js', 'src/*.js', 'tests/**/*.js'],
        tasks: ['development']
      }
    }

  });

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('test', ['jshint', 'mochaTest'] );
  //grunt.registerTask('development', ['jshint', 'simplemocha']);


};
