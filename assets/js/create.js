var temp;
var creator = {
      "kwMappings" : {},
      "projectData" : {},
      "accountData" : {},
      "keyword" : "",
      "custKW" : "",
      "autoPlanIds" : [],
      'projectSave' : function(data) {
          this.projectData = data;
          this.keyword = this.projectData.project.mappings[0].keywords[0].keyword;
      }, //end projectSave
      'accountSave' : function(data) {
          this.accountData = data;
      }, //end projectSave
      'keywordSuggest' : function(url) {
        var that = this,
            mappings;
        // get keyword suggestion data
        $.ajax({
          url: Utils.apiServer + 'keyword/semrush_suggestion?url=' + encodeURIComponent(url),
          method: 'GET',
          data: {},
          success : function (data, status) {
            if (!data.errors) {
              console.log('keyword data',data);
              that.createVolumeMappings(data, url); // format into an API friendly format in 'mappings'
            } else {
              console.log('keyword errors',data.errors);
              // handle errors
              // ('Sorry, suggested keywords could not be retrieved at this time.');
            }
          },
          error : function (data, status) {
              console.log('keyword API Error',data);
            // ('Sorry, suggested keywords could not be retrieved at this time.');
          }
        }); // $.ajax
      }, // end KeywordSuggest
      "createVolumeMappings" : function (data, url) {

        var keywordSuggest = data[0],
            volumes        = [],
            mapping        = [];

          // map response to expected API JSON
          volumes.push({
                        'keyword' 		: keywordSuggest.keyword,
                        'volume' 			: keywordSuggest.volume,
                        'cpc'					: keywordSuggest.cpc,
                        'currency'		: 'USD'
                       });
          mapping.push({
                        'url' 			  : url,
                        'keywords'   	: [keywordSuggest.keyword]
                       });
          this.kwMappings = {
                              'url'									: url,
                              'volumes'							: volumes,
                              'mappings'						: mapping,
                              'search_engine_code' 	: keywordSuggest.search_engine_code
                            };

          this.createProject(); // create new project

      }, // end createVolumeMappings
      "createProject"  : function() {

        var that = this;

        $(".wstep").css("opacity", 0);
        $(".wstep3").css("opacity", 1); // creating actions

        $.ajax({
                url						: Utils.apiServer + '/onboarding/project/create',
                method				: 'POST',
                data					: JSON.stringify({project: that.kwMappings}),
                'processData' : true,
                'contentType' : 'application/json',
                'accepts' 		: 'application/json',
                'dataType' 		: 'JSON',
          success : function (data, status) {
            that.projectSave(data);
            $(".skip").addClass("fade-in").css("opacity", 1); // make skip step visible
            that.pollAudit();
          }, // end success
          error : function (data, status) {
          // todo: handle error
          } // end error
        }); //.ajax

      }, //end createProject
      'pollAudit' : function() {

        $(".wstep").css("opacity", 0);
        $(".wstep4").css("opacity", 1); // creating actions

        var that = this,
            tasksUrl = Utils.apiServer + 'onboarding/project/' + this.projectData.project.id + '/tasks',
            TIME_INTERVAL = 5 * 1000, // poll time intervals
            POLL_ITERATIONS = 24, // maximum number of polling iterations
            increment = 0, // used to track polling iterations
            timeOut = null; // reference to timer object

        // Action Poll (daemon)
        (function daemon() {

            if (increment >= POLL_ITERATIONS) {
                // audit timeout
                console.log('Polling exit');
                // ('Sorry, there was a problem loading your actions. Please try again.')
                clearTimeout(timeOut);

            } else {
              // Poll iteration
                console.log("Polling " + increment);

            $.ajax({
              url: tasksUrl,
              method: 'GET',
              data: {
                project_name  : that.projectData.project.name,
                fields        : 'all',
                filters       : '[["task_type","in","quick_audit","full_audit"],["is_declined","eq","false"],["is_planned","eq","false"],["is_finished","eq","false"]]'
              },
              success: function (data, status){
                if (!data.errors) {
                  console.log('data.tasks.length ', data.tasks.length);

                  // cancel polling if actions are available
                  if (data.tasks.length > 0) {
                      that.actionPriority(data.tasks); // Auto plan actions
                      that.animateTick();

                    // GA Event
                    ga('send',
                       'event',
                       'Walk-Actions-Generated',
                       'Walk-Actions-Generated' +
                           '__URL_'     + JSON.parse(localStorage.getItem("glass")).a +
                           '__Name_'    + JSON.parse(localStorage.getItem("glass")).b +
                           '__email_'   + JSON.parse(localStorage.getItem("glass")).c +
                           '__Actions_' + data.tasks.length,
                       'Walk-Funnel-B'
                      );

                    increment = POLL_ITERATIONS; // max out iterations to exit

                  } else {
                    // @todo: handle 'no actions available'
                  }
                } else {
                  // error occurred
                  // display error message
                }
              },
              error : function () {
                // handle error
              }
            }); // $.ajax
                increment++;
                clearTimeout(timeOut);
                timeOut = setTimeout(daemon, TIME_INTERVAL);
            } //end else
        }()); // end self-invoking daemon()
      }, // end pollAudit
      "actionPriority" : function(data) {
          var quickAudit,
              fullAudit,
              performance;

          function sortLogic (data, category) {
            return data.filter(function(a){return (a.task_type === category)})
                       .sort(function(a, b){return a.priority - b.priority})
                       .slice(0, Utils.actionCap)
                       .map(function(a){return a.id});
          }; // end sortLogic

          quickAudit  = sortLogic(data, 'quick_audit');
          fullAudit   = sortLogic(data, 'full_audit');
          performance = sortLogic(data, 'performance');

          console.log('quickAudit', quickAudit);
          console.log('fullAudit', fullAudit);
          console.log('performance', performance);

          this.autoPlanIds = quickAudit.concat(fullAudit, performance); // Add prioritised actions in order

      }, // end actionPriority
      "createAccount"  : function() {
          var that = this,
              newAccount =  {
                              'account'       : {
                                                  'email'      : JSON.parse(localStorage.getItem("glass")).c,
                                                  'first_name' : JSON.parse(localStorage.getItem("glass")).b
                                                },
                              'new_password'  : JSON.parse(localStorage.getItem("glass")).d,
                              'url'				    : JSON.parse(localStorage.getItem("glass")).a,
                              'project_id' 	  : this.projectData.project.id,
                              'project_name'  : this.projectData.project.name,
                              'planned_tasks' : this.autoPlanIds,
                              'login' 		  	: true, // auto login to the App
                              'fields'        : 'all'
                             };

          // GA Event
          ga('send',
             'event',
             'Walk-See-Action-Plan',
             'Walk-See-Action-Plan' +
                 '__URL_'    + JSON.parse(localStorage.getItem("glass")).a +
                 '__Name_'   + JSON.parse(localStorage.getItem("glass")).b +
                 '__email_'  + JSON.parse(localStorage.getItem("glass")).c +
                 '__GenKW_'  + this.keyword +
                 '__CustKW_' + this.custKW,
             'Walk-Funnel-B'
            );

          $.ajax({
                  'url'           : Utils.apiServer + 'account/create',
                  'method'        : 'POST',
                  'data'          : JSON.stringify(newAccount),
                  'processData' 	: true,
                  'contentType' 	: 'application/json',
                  'accepts' 		  : 'application/json',
                  'dataType' 		  : 'JSON',
                  'success' 	   	: function (data, status) {
                                      that.accountSave(data);
                                      if (data.account) {
                                          // finish animation
                                          console.log('Thank you for signing up');
                                          that.redirect();
                                      } else if (data.errors) {
                                        // handle error
                                            console.log("data.errors", data.errors);
                                            if ('account_exists' in data.errors) {
                                                console.log("Sorry, this email is already registered."); // this shuold never happen as error already caught on previous screen.
                                            } // end if
                                      } // end else if
                                    },
                                    'error' : function (data, status) {
                                        console.log("ajax.error");
                                    } // end success
          }); // end ajax
      }, //end createAccount
      "updateProject"  : function(keyword) {

        var that = this,
            updateProject = {
                      				"project_name" : this.projectData.project.name,
                              "project" 		 : {
                                                  // "search_engine_code": "google_en-au",
                                                  "mappings" : [
                                                    {
                                                     "url" : this.projectData.project.url,
                                                     "keywords" : [{"keyword": keyword}]
                                                    }
                                                  ]
                                               }
                             };

        this.custKW = keyword; //Set custom keyword for GA.

        $.ajax({
                'url'           : Utils.apiServer + '/onboarding/project/' + that.projectData.project.id + '/update',
                'method'        : 'POST',
                'data'          : JSON.stringify(updateProject),
                'processData' 	: true,
                'contentType' 	: 'application/json',
                'accepts' 		  : 'application/json',
                'dataType' 		  : 'JSON',
                'success' 	   	: function (data, status) {
                                    if (!data.errors) {
                                      // console.log('updateProject data',data);
                                      that.createAccount();
                                    } else {
                                      console.log('updateProject errors',data.errors);
                                    } // end else
                                  },
                'error'         : function (data, status) {
                                    console.log("ajax.error");
                                  } // end success
        }); // end ajax
      }, // end updateProject
      "redirect"  : function() {
        that = this;
        localStorage.clear(); // clear temp local storage.
        (function loadDelay() {
          setTimeout(function(){
            newUrl = Utils.uiServer + '#clients/' + that.accountData.client_id + '/' + 'campaigns/' + that.accountData.project_id + '/plan';
            console.log("redirect to main App ", newUrl);
            window.location.href = newUrl;
          }, 1000);
        }()); // loadDelay()
      }, // end redirect
      "animateTick" : function() {
          setTimeout(function() {
        		$(".wstep").css("opacity", 0);
        		$(".wstep5").css({"display": "block", "opacity": 1});
        	}, 1000);
        	setTimeout(function() {
        		$(".bubble").addClass("hidden");
        	}, 800);
        	setTimeout(function() {
        		$(".shape").addClass("loading-complete");
        	}, 800);
        	setTimeout(function() {
        		$(".timer img").css("opacity", 0);
        	}, 1000);
        	setTimeout(function() {
        		$(".shape").addClass("circle");
        	}, 2000);
        	setTimeout(function() {
        		$(".tick-white").removeClass("hidden"); // adds the white tick
        	}, 2800);
      } // end animateTick

} // end creator
// animations on walkthrough.html (finding best keyword, creating actions, generating plan)
$(document).ready(function() {

  $.ajaxSetup({
              headers   : { 'Accept': 'application/json' },
              xhrFields : { withCredentials: true }
             });

  if(localStorage.getItem("glass") === null) {
      window.location.href = '/signup/';

  } else {
      var aStore = JSON.parse(localStorage.getItem("glass")).a;
      setTimeout(function() {
        creator.keywordSuggest(aStore); // kick things off by starting keyword suggestion
      }, 500);

    	$(".walkthrough").addClass("animate"); // start timer animation

      // Attach GA event to Skip button
      $(".skip").click(function() {
        //GA Event
        ga('send','event','Walk-Skip','Walk-Skip','Walk-Funnel-B');
      }); // end .skip click

    	// keyword popup
    	$(".ready-class").click(function() {
    		$("#user-kw").val(creator.keyword);
    		$(".mask").fadeIn();
    		$(".keyword-popup").fadeIn();
    	});

      // questionmark popup
      $(".question-mark").hover(function() {
    		$(".question-popup").toggle();
    	})

    	// keyword submit
    	$("#user-kw-submit").click(function() {
    		var newKw = $("#user-kw").val();
    		if (creator.keyword === newKw) {
    			creator.createAccount(); // redirect to App
    		} else {
    			creator.updateProject(newKw);
    		} // end else
    	});
  } // end if
}); // end document ready on walkthrough.html
