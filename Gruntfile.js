module.exports = function( grunt ) {
	grunt.initConfig({

		pkg: grunt.file.readJSON( 'package.json' ),

		concat: {
			dist: {
        		src: [
        			'js/lib/jquery.js',
            		'js/lib/*.js',
            		'js/app.js'
        		],
        		dest: 'js/build/production.js',
    		}
		},
		uglify: {
			build: {
				src: 'js/build/production.js',
				dest: 'js/build/production.min.js'
			}
		},
		cssmin: {
			dist: {
				options: {
					shorthandCompacting: false,
					keepSpecialComments: 0
				},
				files: {
					'css/build/production.min.css': ['css/**/*.css']
				}
			}
		},
		watch: {
			scripts: {
				files: ['js/*.js'],
				tasks: ['concat', 'uglify', 'cssmin'],
				options: {
					spawn: false,
				},
			} 
		}

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);

}