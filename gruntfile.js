module.exports = function(grunt) {
    const imagemin = require('imagemin');
    const imageminJpegtran = require('imagemin-jpegtran');

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        imagemin: {
            png: {
                options: {
                    optimizationLevel: 3,
                    svgoPlugins: [{removeViewBox: false}]
                },
                files: [{
                    expand: true,
                    cwd: "app/",
                    src: ["**/*.png"],
                    dest: "dist/img",
                    ext: ".png"
                }]
            }
        },
        cssmin: {
            minify: {
                src: "dist/style/style.css",
                dest:"dist/style/style.min.css"
            }
        },
        less: {
            developement: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "dist/style/style.css": "app/style.less"
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        "dist/css/minified/style.min.css",
                        "dist/*.html"
                    ]
                },
                options: {
                    watchTask: true,
                    server: "./"
                }
            }
        },
        watch: {
            less: {
                files: ["**/*.html","**/*.js","**/*.less"],
                tasks: ["less","cssmin","imagemin"]
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-browser-sync");
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask("default",["browserSync","watch"]);
}