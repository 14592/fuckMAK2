var config = require('./gruntConfig.json');

module.exports = function (grunt) {
	'use strict';
	
	var sapHost = config.sapHost;
    var sapServer = config.sapProtocol + "://" + sapHost;
	var sapBspContainer = config.sapBspContainer;
	var sapPackage = config.sapPackage;
	var sapTransport = config.sapTransport;
	var sapAppName = config.sapAppName;
	var sapAppUrl = sapServer + "/sap/bc/ui5_ui5/sap/" + sapBspContainer + "/index.html?sap-client=101&sap-ui-language=DE&sap-ui-appcache=false"
	
	grunt.initConfig({
		nwabap_ui5uploader: {
			options: {
			  conn: {
				server: sapServer,
			  },
			  auth: {
				user: config.sapUser,
				pwd: config.sapPassword
			  }
			},
			upload_build: {
				options: {
					ui5: {
					   language: 'DE',
					   package: sapPackage,
					   bspcontainer: sapBspContainer,
					   bspcontainer_text: sapAppName,
					   transportno: sapTransport
					},
					resources: {
					  cwd: 'webapp',
					  src: '**/*.*'
					}
				}
			}
		},
		prompt: {
            deploy: {
                options: {
                    questions: [
                        {
                            config: 'nwabap_ui5uploader.options.auth.user',
                            type: 'input',
                            message: 'SAP-Username'
                        }, {
                            config: 'nwabap_ui5uploader.options.auth.pwd',
                            type: 'password',
                            message: 'SAP-Passwort'
                        }
                    ]
                }
            }
        },
		open: {
			deploy: {
				path: sapAppUrl,
				app: "Firefox"
			}
		}
	});
	
	// Definiere Tasks
	require('load-grunt-tasks')(grunt);
	
	// Deployment ins SAP-System
    grunt.registerTask('deploy', function() {
    	if(!sapBspContainer || !sapPackage || !sapTransport){
    		grunt.fail.warn("Please configure your gruntConfig.js!");
		}

        if (!config.sapUser || 
			!config.sapPassword || 
			config.sapUser == "DEVVG-XX" || 
			config.sapPassword == "") {
				
            grunt.task.run('prompt:deploy');
        }
        grunt.task.run('nwabap_ui5uploader');
		grunt.task.run('open');
    });
};

