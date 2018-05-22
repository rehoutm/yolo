module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    ts: {
      default: {
        tsconfig: {
            tsconfig: './tsconfig.json',
            passThrough: true,
            updateFiles: true,
            overwriteFiles: true
        }
      }
    },
    watch: {
      ts: {
        files: ["src/**/*.ts"],
        tasks: ["ts"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask("default", [
    "ts"
  ]);

};