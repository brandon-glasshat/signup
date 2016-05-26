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
              'actionCap' : 4 // Set the number of actions per category (quick_audit, full_audit, performance)
            }; // end Utils
