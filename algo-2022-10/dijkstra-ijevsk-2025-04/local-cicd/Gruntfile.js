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
            {
                options: {
                    livereload: true
                },
                files: [
                    '../bricks-runner-arcade/src/**/*.*'
                ],
                tasks: ['exec:buildBricksArcade']
            },
        ],
        concat: {
        },
        exec: {
            build: {
                cmd: `bash ./build-app.sh`
                // cmd: `build-app.bat`
            },
            buildBricks: {
                cmd: `bash ./build-bricks.sh`                
                // cmd: `build-bricks.bat`
            },
            buildBricksArcade: {
                cmd: `bash ./build-bricks-arcade.sh`                
                // cmd: `build-bricks.bat`
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
