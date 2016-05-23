var tour = {
  id: 'hello-hopscotch',
  steps: [
    {
      target: 'screenshot',
      title: 'While you’re waiting, take a tour of our dashboard',
      content: 'We\'re just building the action plan for your website, so in the meantime we want to show you how a couple of things work around here...<p class="pageId">Step 1 of 9</p>',
      placement: 'top',
      arrowOffset: 0,
      zindex: 2,
      delay: 2000,
      xOffset: 'center',
      yOffset: 250,
      width: 450,
      onNext: function() {
        Utils.arrowShow();
        ga('send', 'event', 'Walk-Step1-Next', 'Walk-Step1-Next__While-youre-waiting-take-a-tour-of-our-dashboard', 'Walk-Funnel-B');
      }, //end onNext
      onClose: function() {
        console.log('onClose','OnClose');
        ga('send', 'event', 'Walk-Step1-Close', 'Walk-Step1-Close__While-youre-waiting-take-a-tour-of-our-dashboard', 'Walk-Funnel-B');
      } // endOnClose
    },
    {
      target: 'action',
      title: 'Your action plan',
      content: 'Think of your action plan as your website\'s \'to-do list\'.</p>Quickly see how long each action takes to complete and which are the easiest to get started on<p class="pageId">Step 2 of 9</p>',
      placement: 'right',
      arrowOffset: 75,
      zindex: 2,
      xOffset: '0',
      yOffset: '-75',
      width: 450,
      highlight: true,
      onPrev: function() {
        setTimeout(function() {
          Utils.arrowHide();
        }, 2020);
      }, //end onPrev
      onClose: function() {
        ga('send', 'event', 'Walk-Step2-Close', 'Walk-Step2-Close__Your-action-plan', 'Walk-Funnel-B');
      }, // endOnClose
      onNext: function() {
        $('#screenshot').css("background-image", "url(assets/img/ss/2.png)");
        Utils.arrowHide();
        ga('send', 'event', 'Walk-Step2-Next', 'Walk-Step2-Next__Your-action-plan', 'Walk-Funnel-B');
      } //end onNext
    },
    {
      target: 'actiondesc',
      title: 'Need to know how to complete each action?',
      content: 'Click on each action to see step-by-step instructions that include expert hints and tips to help you to complete the action like a pro.<p class="pageId">Step 3 of 9</p>',
      placement: 'top',
      arrowOffset: 0,
      zindex: 2,
      highlight: true,
      xOffset: 'center',
      yOffset: 'center',
      onPrev: function() {
        $('#screenshot').css("background-image", "url(assets/img/ss/1.png)");
        Utils.arrowShow();
      }, //end onPrev
      onClose: function() {
        ga('send', 'event', 'Walk-Step3-Close', 'Walk-Step3-Close__Need-to-know-how-to-complete-each-action', 'Walk-Funnel-B');
      }, // endOnClose
      onNext: function() {
        Utils.arrowShow();
        ga('send', 'event', 'Walk-Step3-Next', 'Walk-Step3-Next__Need-to-know-how-to-complete-each-action', 'Walk-Funnel-B');
      } //end onNext
    },
    {
      target: 'exporttocsv',
      title: 'Want to send this work onto someone else?',
      content: 'You can easily download a list of the URLs that require work by hitting \'Export\'.<p class="pageId">Step 4 of 9</p>',
      placement: 'top',
      arrowOffset: 250,
      zindex: 2,
      xOffset: -250,
      yOffset: 0,
      highlight: true,
      onPrev: function() {
        Utils.arrowHide();
      }, //end onPrev
      onClose: function() {
        ga('send', 'event', 'Walk-Step4-Close', 'Walk-Step4-Close__Want-to-send-this-work-onto-someone-else', 'Walk-Funnel-B');
      }, // endOnClose
      onNext: function() {
        $('#screenshot').css("background-image", "url(assets/img/ss/1.png)");
        Utils.arrowShow();
        ga('send', 'event', 'Walk-Step4-Next', 'Walk-Step4-Next__Want-to-send-this-work-onto-someone-else', 'Walk-Funnel-B');
      } //end onNext
    },
    {
      target: 'actionstab',
      title: 'Ready to add more actions to your plan?',
      content: 'Visit the \'Actions\' tab to explore all the latest recommendations we\'ve generated for your website. <p class="pageId">Step 5 of 9</p>',
      placement: 'bottom',
      arrowOffset: 50,
      zindex: 2,
      xOffset: 60,
      yOffset: 0,
      width: 450,
      highlight: true,
      onPrev: function() {
        $('#screenshot').css("background-image", "url(assets/img/ss/2.png)");
        Utils.arrowShow();
      }, //end onPrev
      onClose: function() {
        ga('send', 'event', 'Walk-Step5-Close', 'Walk-Step5-Close__Ready-to-add-more-actions-to-your-plan', 'Walk-Funnel-B');
      }, // endOnClose
      onNext: function() {
        $('#screenshot').css("background-image", "url(assets/img/ss/3.png)");
        Utils.arrowShow();
        ga('send', 'event', 'Walk-Step5-Next', 'Walk-Step5-Next__Ready-to-add-more-actions-to-your-plan', 'Walk-Funnel-B');
      } //end onNext
    },
    {
      target: 'filter',
      title: 'Looking for something specific?',
      content: 'Filter the type of action you want to see by category, time or difficulty.<p class="pageId">Step 6 of 9</p>',
      placement: 'right',
      arrowOffset: 30,
      zindex: 2,
      xOffset: 0,
      yOffset: 0,
      highlight: true,
      onPrev: function() {
        $('#screenshot').css("background-image", "url(assets/img/ss/1.png)");
        Utils.arrowShow();
      }, //end onPrev
      onClose: function() {
        ga('send', 'event', 'Walk-Step6-Close', 'Walk-Step6-Close__Looking-for-something-specific', 'Walk-Funnel-B');
      }, // endOnClose
      onNext: function() {
        Utils.arrowShow();
        ga('send', 'event', 'Walk-Step6-Next', 'Walk-Step6-Next__Looking-for-something-specific', 'Walk-Funnel-B');
      } //end onNext
    },
    {
      target: 'healthcheck',
      title: 'Add Healthcheck Actions to your plan',
      content: 'At the top of the \'Actions\' tab you\'ll find all the general housekeeping actions we have lined up for you.</p>Did you know that even basic issues with your website can prevent potential leads from finding you online?<p class="pageId">Step 7 of 9</p>',
      placement: 'top',
      arrowOffset: 30,
      zindex: 2,
      xOffset: 300,
      yOffset: 0,
      width: 600,
      highlight: true,
      onPrev: function() {
        Utils.arrowShow();
      }, //end onPrev
      onClose: function() {
        ga('send', 'event', 'Walk-Step7-Close', 'Walk-Step7-Close__Add-Healthcheck-Actions-to-your-plan', 'Walk-Funnel-B');
      }, // endOnClose
      onNext: function() {
        Utils.arrowShow();
        ga('send', 'event', 'Walk-Step7-Next', 'Walk-Step7-Next__Add-Healthcheck-Actions-to-your-plan', 'Walk-Funnel-B');
      } //end onNext
    },
    {
      target: 'performance',
      title: 'Select Performance Actions to start overtaking competitors',
      content: 'The actions below are generated when we detect that your competitors are doing something that\'s helping them to get found online.</p>Completing these actions will help to boost your position in Google, driving more visitors to your website.<p class="pageId">Step 8 of 9</p>',
      placement: 'top',
      arrowOffset: 30,
      zindex: 2,
      xOffset: 50,
      yOffset: 0,
      width: 600,
      highlight: true,
      onPrev: function() {
        Utils.arrowShow();
      }, //end onPrev
      onClose: function() {
        ga('send', 'event', 'Walk-Step8-Close', 'Walk-Step8-Close__Select-Performance-Actions-to-start-overtaking-competitors', 'Walk-Funnel-B');
      }, // endOnClose
      onNext: function() {
        $('#screenshot').css("background-image", "url(assets/img/ss/4.png)");
        Utils.arrowHide();
        ga('send', 'event', 'Walk-Step8-Next', 'Walk-Step8-Next__Select-Performance-Actions-to-start-overtaking-competitors', 'Walk-Funnel-B');
      } //end onNext
    },
    {
      target: 'screenshot',
      title: 'Simple project setup',
      content: 'Finally you can customise your project at any time in the Project Setup tab.</p>You can update and edit your project details, the keywords you want to target and URL\'s you want to focus on here.<p class="pageId">Step 9 of 9</p>',
      placement: 'top',
      arrowOffset: 0,
      zindex: 2,
      xOffset: 'center',
      yOffset: 350,
      width: 450,
      onPrev: function() {
        $('#screenshot').css("background-image", "url(assets/img/ss/3.png)");
        Utils.arrowShow();
      }, //end OnPrev
      onClose: function() {
        ga('send', 'event', 'Walk-Step9-Close', 'Walk-Step9-Close__Simple-project-setup', 'Walk-Funnel-B');
      }, // endOnClose
    }
  ],
      onEnd: function () {
        setTimeout(function() {
          $( ".ready-class" ).trigger( "click" );
        }, 500);
        ga('send', 'event', 'Walk-Step9-End', 'Walk-Step9-End__Simple-project-setup', 'Walk-Funnel-B');
      } //end OnEnd
  ,
  showPrevButton: true,
  scrollTopMargin: 100,
  showCloseButton: true,
  onStart: function() {
      setTimeout(function() {
        Utils.arrowHide();
      }, 2020);
  } // end onStart
};

hopscotch.startTour(tour); // Tour start
