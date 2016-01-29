module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['js/dev/*.js'],
        dest: 'js/script.js'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'css/main.css':'scss/main.scss'
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'js/<%= pkg.name %>.js' : '<%= concat.dist.dest %>'
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/dev/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'img/'
        }]
      }
    },
    watch: {
      sass: {
        files: ['scss/**/*.scss', 'scss/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: {
            host: 'localhost',
            port: 35729,
          }
        },
      },
      js: {
        files: 'js/dev/main.js',
        options: {
          livereload: {
            host: 'localhost',
            port: 35729,
          }
        },
      },
      files: '<%= concat.dist.src %>',
      tasks: ['concat', 'uglify', 'sass']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('default', ['concat', 'uglify', 'imagemin']);

};