const { exec } = require('child_process');

let counter = 1;
const runCompile = (filepath) => {
    const internalExec = (curCounter) => {
        exec(`tsc ${filepath}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`compile (${filepath}) (${curCounter}) finished. Stdout: ${stdout}`);
        });
    };
    internalExec(counter);
    console.log('runCompile() counter=', counter++);
};

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
                exec: ''
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-run');
    grunt.registerTask('default', ['watch']);

    grunt.event.removeAllListeners('watch');
    grunt.event.on('watch', function (action, filepath, target) {
        grunt.log.writeln(`action=${action} filepath=${filepath} target=${target}`);
        if (target !== 'runCompileTs') {
            return;
        }

        const fileExt = filepath.split('.').pop();
        grunt.log.writeln('fileExt=', fileExt);

        if (fileExt !== 'ts') {
            return;
        }

        runCompile(filepath);
    });
};
