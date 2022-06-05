module.exports = function(grunt) {
    grunt.initConfig({
        copy: {
            project: {
                expand: true,
                cwd: '.',
                src: ['**', '!Gruntfile.js', '!package.json', '!public/bower.json'],
                dest: 'dist'
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
};