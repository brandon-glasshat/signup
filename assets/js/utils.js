// Utils
var Utils = {
              'uiServer'  : 'https://app.glasshat.com/index.html',
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
              'corsRequest' : function(method, server, callback) {

                function xhrRequest (method, url) {
                  var xhr = new XMLHttpRequest();
                    xhr.withCredentials = true;
                  if ("withCredentials" in xhr) {

                    xhr.open(method, url, true);

                  } else if (typeof XDomainRequest != "undefined") {

                    xhr = new XDomainRequest();
                    xhr.open(method, url);

                  } else {

                    // Otherwise, CORS is not supported by the browser.
                    xhr = null;

                  } //end else
                  return xhr;
                } // end xhrRequest

                var cors = xhrRequest(method, server);
                cors.onreadystatechange = function() {
                  if (cors.readyState == 4 && cors.status == 200) {
                    callback(cors.responseText);
                  } else if (cors.readyState == 4 && cors.status == 0) {
                    callback(null);
                  } //end if
                }; // end cors.onreadystatechange
                cors.send(); // send request

              }, // end corsRequest1
              'actionCap' : 4 // Set the number of actions per category (quick_audit, full_audit, performance)
            }; // end Utils
