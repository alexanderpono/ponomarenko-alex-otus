module.exports = function (grunt) {
    console.log('grunt!');

    grunt.initConfig({
        watch: [
            {
                options: {
                    livereload: true
                },
                files: [
                    'Gruntfile.js'
                ]
            },
            {
                options: {
                    livereload: true
                },
                files: [
                    '../app-dev/src/**/*.*'
                ],
                tasks: ['exec:build']
            },
        ],
        concat: {
        },
        exec: {
            build: {
                cmd: `./build-app.sh`
            },
        },
        run: {
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-run');
    grunt.registerTask('default', ['watch']);
};
