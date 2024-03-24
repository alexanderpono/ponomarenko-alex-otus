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
            {
                options: {
                    livereload: true
                },
                files: [
                    '../bricks-runner/src/**/*.*'
                ],
                tasks: ['exec:buildBricks']
            },
        ],
        concat: {
        },
        exec: {
            build: {
                cmd: `bash ./build-app.sh`
            },
            buildBricks: {
                cmd: `bash ./build-bricks.sh`
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
