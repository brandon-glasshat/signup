
// Signup Fields Validation
var validator = {
      "hasValidURL"           : null,
      "hasValidURLValue"      : null,
      "hasValidURLValueClean" : null,
      "hasValidName"          : null,
      "hasValidEmail" 	      : null,
      "hasValidPassword"      : null,
      "validateUrl" : function(url) {
          var that = this;

          validator.hasValidURL = false; // reset hasValidURL flag
          $('.website-url').removeClass('bad good'); // remove message classes

          if (!/^https?:\/\//.test(url)) {
              url = 'http://' + url;
          } // end change URL

          function callback(dataString) {
            data = JSON.parse(dataString);
            console.log('verify URL',data);

            if (data.exist === true) {
                var stripRegex            = /(https?:\/\/)/,
                    suggestedUrl          = data.redirected_path[data.redirected_path.length - 1].url,
                    suggestedUrlClean     = suggestedUrl.replace(stripRegex, '').replace(/\/$/, ''),
                    urlClean              = url.replace(stripRegex, '').replace(/\/$/, '');

                that.hasValidURL = true;
                that.hasValidURLValue = suggestedUrl;
                that.hasValidURLValueClean = suggestedUrlClean;
                $('.website-url').removeClass('bad wait').addClass('good');

                // GA Event
                ga('send',
                   'event',
                   'Walk-URL-Added',
                   'Walk-URL-Added' +
                   '__URL_' + suggestedUrlClean,
                   'Walk-Funnel-B'
                  );

                if (data.redirected === true && suggestedUrlClean !== urlClean) {
                  // If we are here, the redirected url is significantly different
                  $('#url').val(suggestedUrlClean); // write the redirected and clean URL back to input box
                } // end if

            } else {
                // If we are here, the url could not be resolved
                Utils.message('.website-url','.website-url-check','! Oops, that URL doesn\'t look correct. Please try again.');
            }
          }//end callback

          Utils.corsRequest('GET',Utils.apiServer + 'utils/validate-url?url=' + encodeURIComponent(url), callback); // Validate URL Api

      }, // end validateUrl
      "validateName" : function (nameField) {
          validator.hasValidName = false; // reset hasValidName flag
          $('.first-name').removeClass('bad good');

          if (nameField.length === 0) {
            Utils.message('.first-name','.first-name-check','! Please enter your first name.');

          } else if (nameField.length > 50) {
            Utils.message('.first-name','.first-name-check','! Your name can\'t be more than 50 characters.');

          } else if (nameField.match(/[0-9]/g) !== null) {
            Utils.message('.first-name','.first-name-check','! Your name can only contain letters.');

          } else {
            validator.hasValidName = true;
            $('.first-name').removeClass('bad').addClass('good');
          } // end if
      }, // end validateName
      "validateEmail" : function (emailField) {
          validator.hasValidEmail = false; // reset hasValidEmail flag
          $('.email-address').removeClass('bad good');

          function isValidEmail (email) {
            var regExp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
            return regExp.test(email);
          } // end isValidEmail

          if (emailField.length === 0) {
            Utils.message('.email-address','.email-address-check','! Please enter your email address.');

          } else if (emailField.length > 100) {
            Utils.message('.email-address','.email-address-check','! Please enter an address less than 100 characters.');

          } else if (!isValidEmail(emailField)) {
            Utils.message('.email-address','.email-address-check','! Please enter a valid email address.');

          } else {

            function callback(dataString) {
              var data = JSON.parse(dataString);

              if (data.errors) {
                  console.log("account exists");
                  Utils.message('.email-address','.email-address-check','! It seems you already have an account. <a href="https://app.glasshat.com/#account/login/">Log In Here</a>');
              } else {
                  validator.hasValidEmail = true;
                  $('.email-address').removeClass('bad wait').addClass('good');
              } // end else
            } // end callback

            Utils.corsRequest('GET', Utils.apiServer + 'account/validate?email=' + encodeURIComponent(emailField), callback); //

          } // end else
      }, // end validateEmail
      "validatePassword" : function (passwordField) {
          validator.hasValidPassword = false; // reset hasValidName flag
          $('.password-submit').removeClass('bad').removeClass('good');

          if (passwordField.length < 5) {
            Utils.message('.password-submit','.password-submit-check','! Password needs to be at least 5 characters.');

          } else if (passwordField.length > 50) {
            Utils.message('.password-submit','.password-submit-check','! Password password must be less than 50 characters.');

          } else if (passwordField.match(/[a-z]|[A-Z]/g) === null) {
            Utils.message('.password-submit','.password-submit-check','! Password password must contain at least 1 letter.');

          } else if (passwordField.match(/[A-Z]/g) === null && passwordField.match(/[0-9]/g) === null) {
            Utils.message('.password-submit','.password-submit-check','! Password must contain 1 uppercase letter and 1 number.');

          } else if (passwordField.match(/[A-Z]/g) === null) {
            Utils.message('.password-submit','.password-submit-check','! Password must contain 1 uppercase letter.');

          } else if (passwordField.match(/[0-9]/g) === null) {
            Utils.message('.password-submit','.password-submit-check','! Password must contain 1 number.');

          } else {
            validator.hasValidPassword = true;
            $('.password-submit').removeClass('bad').addClass('good');
          } // end if
      }, // end validatePassword
      "sendData": function() {
        var packed = "";
        packed = JSON.stringify({'a' : this.hasValidURLValue,
                                 'b' : $.trim($('#firstName').val()),
                                 'c' : $.trim($('#email').val()),
                                 'd' : md5($('#password').val()),
                                 'e' : this.hasValidURLValueClean
                               });
       // GA Event
       ga('send',
          'event',
          'Walk-OK-Lets-Go',
          'Walk-OK-Lets-Go' +
              '__URL_'   + JSON.parse(packed).a +
              '__Name_'  + JSON.parse(packed).b +
              '__email_' + JSON.parse(packed).c,
          'Walk-Funnel-B'
         );

        document.data.data.value = packed; // set hidden form field
        validator.cssAnimator(); // start CSS animations
      }, // end sendData
      'cssAnimator' : function() {
      			$(".signup-form").addClass("fade-out");
      			$(".loader").addClass("fly-in");
      	    	if ($('.signup-process.fill').length) {
      		    	$(".signup-form.fade-out").delay(4000).hide(0);
      	    	}
      	    	setTimeout(function(){
      				$(".loading-steps").addClass("load-steps");
      			}, 3000);
      	    	setTimeout(function() {
              document.data.submit(); // submit hidden form and go to walkthrogh.php
      				// window.location.href = "walkthrough.html";
      			}, 4500);
      } // end cssAnimator
} // end validator

// Attach blur event to input fields
$(document).ready(function () {
  $.ajaxSetup({
              headers   : { 'Accept' : 'application/json'
                          },
              xhrFields : { withCredentials : true
                          }
            });

  $('#url').blur(function () {
    $('.website-url').addClass('wait');
    validator.validateUrl($('#url').val());
  }); // end validateUrl
  $('#firstName').blur(function () {
    validator.validateName($('#firstName').val());
  }); // end validateName
  $('#email').blur(function () {
    $('.email-address').addClass('wait');
    validator.validateEmail($('#email').val());
  }); // end validateEmail
  $('#password').blur(function () {
    validator.validatePassword($('#password').val());
  }); // end validatePassword

  // Attach click event to lets go button and shake blank entries.
  $('#letsGo').click(function () {


    if (validator.hasValidURL === null) {
      $('.website-url').addClass('wait');
      validator.validateUrl($('#url').val());
    }

    if (validator.hasValidName === null) {
      validator.validateName($('#firstName').val());
    }

    if (validator.hasValidEmail === null) {
      validator.validateEmail($('#email').val());
    }

    if (validator.hasValidPassword === null) {
      validator.validatePassword($('#password').val());
    }


    function shake(divId) {
      return $(divId).effect( "shake", {distance:3});
    } // end shake

    if (validator.hasValidURL === false) {
      if ($('#url').val().length === 0) {
        Utils.message('.website-url','.website-url-check','! Please enter your website URL');
        shake('.website-url-check');
      } else {
        shake('.website-url-check');
      }
    }

    if (validator.hasValidName === false) {
      if ($('#firstName').val().length === 0) {
        Utils.message('.first-name','.first-name-check','! Please enter your name');
        shake('.first-name-check');
      } else {
        shake('.first-name-check');
      }
    }
    if (validator.hasValidEmail === false) {
      if ($('#email').val().length === 0) {
        Utils.message('.email-address','.email-address-check','! Please enter your email address');
        shake('.email-address-check');
      } else {
        shake('.email-address-check');
      }
    }
    if (validator.hasValidPassword === false) {
      if ($('#password').val().length === 0) {
          Utils.message('.password-submit','.password-submit-check','! Please enter your password');
          shake('.password-submit-check');
        } else {
          shake('.password-submit-check');
        }
    }
    if(validator.hasValidURL && validator.hasValidName && validator.hasValidEmail && validator.hasValidPassword) {
      // validator.tempStore(); // this needs to be changed.
      validator.sendData(); // send Data to walkthrough.php

    } // end if
  }); // end validatePassword
}); // end docuemnt ready
