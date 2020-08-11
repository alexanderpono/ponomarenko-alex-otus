module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            configFiles: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            },
            runCompileTs: {
                files: ['src/*.ts'],
                tasks: ['run:compileTs']
            }
        },
        run: {
            compileTs: {
                exec: 'tsc'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-run');
    grunt.registerTask('default', ['watch']);

    grunt.event.on('watch', function (action, filepath, target) {
        grunt.log.writeln(`action=${action} filepath=${filepath} target=${target}`);
        // var filePathName = filepath.replace(lessFolderPath + '\\','');
        // var fileName = filePathName.replace('.less','');

        // grunt.log.writeln(target + ': ' + filePathName + ' has ' + action);

        // grunt.config('run.compileTs.exec', `tsc ${filepath}`);
        // grunt.config('less.files.src', [filePathName]);
    });
};
