// Utils
var Utils = {
              // Production : 'uiServer'  : 'https://app.glasshat.com/',
              'uiServer'  : 'https://test-2.glasshat.com/latest/',
              // Production :   'apiServer' : 'https://api-ui.glasshat.com/',
              'apiServer'  : 'https://test-2.glasshat.com/',
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
