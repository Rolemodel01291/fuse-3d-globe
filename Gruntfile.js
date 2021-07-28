module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                livereload: true
            },
            tasks: ['browserify'],
            files: ['src/*.js', 'index.html', 'styles.css', 'Gruntfile.js', 'browserify.js']
        },
        browserify: {
            'build/<%= pkg.name %>.js': ['browserify.js']
        },
        shell: {
            buildgrid: {
                command: "bin/buildgrid -r 500 -o grid.js -m resources/equirectangle_projection.png"
            }
        },
        uglify: {
            main: {
                files: {
                    'build/<%= pkg.name%>.min.js': 'build/<%= pkg.name %>.js'
                }
            }
        },
        web_server: {
            options: {
                cors: true,
                port: 8000,
                nevercache: true,
                logRequests: true
            },
            foo: 'bar' // For some reason an extra key with a non-object value is necessary
        }

    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-web-server');

    grunt.registerTask('buildgrid', ['shell:buildgrid']);
    grunt.registerTask('build', ['browserify', 'uglify']);
    grunt.registerTask("default", ['build']);


};
