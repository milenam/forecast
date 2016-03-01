module.exports = function(grunt, tasks) {  
    // Load our node module required for this task.
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // The configuration for a specific task.
    tasks.htmlmin = {
        dist: {
            options: {
                collapseWhitespace: true,
                removeComments: true
            },

            files: [{
                dest: grunt.uriDist, // The destination directory to store our minified files.
                expand: true,
                ext: '.min.html', // The extension to use for our minified file.
                flatten: true,
                src: [
                    grunt.uriSrcHtml + '*.html', // Include all HTML files in this directory.
                    '!' + grunt.uriSrcHtml + '*.min.html' // Exclude any files ending with `.min.html`
                ]
            }]
        }
    };

    return tasks;
};