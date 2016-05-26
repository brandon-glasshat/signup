// Utils
var Utils = {
              'uiServer'  : 'https://app.glasshat.com/v2.7.0/index.html',
              // 'uiServer'  : 'https://test-2.glasshat.com/latest/',
              'apiServer' : 'https://api-ui.glasshat.com/',
              //v'apiServer'  : 'https://test-2.glasshat.com/',
              'message' : function(containerClass, messageClass, message) {
                $(messageClass).html(message);
                $(containerClass).removeClass('wait').addClass('bad');
              }, // end message
              'arrowHide' : function() {
                setTimeout(function(){
                  $('.hopscotch-bubble-arrow-container').hide();
                }, 150);
              }, // end arrowHide
              'arrowShow' : function() {
                setTimeout(function(){
                  $('.hopscotch-bubble-arrow-container').show();
                }, 150);
              }, // end arrowShow
              'corsRequest' : function(method, url) {
                var xhr = new XMLHttpRequest();
                  xhr.withCredentials = true;
                if ("withCredentials" in xhr) {

                  // Check if the XMLHttpRequest object has a "withCredentials" property.
                  // "withCredentials" only exists on XMLHTTPRequest2 objects.
                  xhr.open(method, url, true);

                } else if (typeof XDomainRequest != "undefined") {

                  // Otherwise, check if XDomainRequest.
                  // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                  xhr = new XDomainRequest();
                  xhr.open(method, url);

                } else {

                  // Otherwise, CORS is not supported by the browser.
                  xhr = null;

                }
                return xhr;
              }, // end createCORSRequest
              'actionCap' : 4 // Set the number of actions per category (quick_audit, full_audit, performance)
            }; // end Utils
