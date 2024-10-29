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
                    '../linux-projectWork/templates/docker-compose-template.yml'
                ],
                tasks: ['exec:build']
            },
            {
                options: {
                    livereload: true
                },
                files: [
                    '../linux-projectWork/buildConfigs.sh'
                ],
                tasks: ['exec:build']
            },
        ],
        concat: {
        },
        exec: {
            build: {
                cmd: `bash ../linux-projectWork/buildConfigs.sh`
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
