# Signup
New Glasshat walkthrough signup process which includes a [Hopscotch](http://linkedin.github.io/hopscotch/) app walkthrough and simplied signup process with option of changing keyword.

# What is it?
Signup is two page signup process at [http://www.glasshat.com/signup](http://www.glasshat.com/signup). The first page (index.html) is where _signup.js_ is loaded, which controls data collection for the following input fields:

1. URL
2. Name
3. Email address / login
4. Password

Form data is transferred via HTTP POST from index.html to walkthrough.php using PHP ```$_POST```.

The second page (walkthrough.php) does the following (in order of operation):

1. Keyword selection.
2. Onboarding account creation.
3. Glasshat app walkthrough using a Linkedin plugin called Hopscotch.
4. Polling to wait for Glasshat quick audit actions to be completed.
5. Show popup so users can change password (if they so desire).
6. Create Glasshat account and transfer onboarding project to it.

This is controlled by _create.js_. 

# Where is it?
Signup is a standalone to the main glasshat app and is found in the [signup](http://www.glasshat.com/signup) directory on [http://www.glasshat.com/](http://www.glasshat.com/).

# How do I make changes?
I was just FTPing changes directly to the Amazon EC2 intance: www.glasshat.com. To access you'll need the PEM file. You can get this either of Charlie or Sam. Once logged in, navigate to ```/var/www/html/signup```. Username is: ```ubuntu```.

# What endpoints are used?
The following is a list of Glasshat API endpoints used in the signup walkthrough process (in order of operation):

_In signup.js:_

1. __utils/validate-url__.
Checks if URL entered on signup form is valid, and also checks if the URL redirects ```[data.redirected=true]```. If URL redirect's, the URL is changed to the final redirected URL ```[data.redirected_path.length - 1]```

2. __account/validate__.
Checks if the email address is already registered with Glasshat.

_In create.js:_

3. __```keyword/semrush_suggestion```__.
Input URL from form data to get keyword suggestion rom SEM Rush.

4. __/onboarding/project/create__.
Create onboarding project so we can get quick, full and performance actions. At this stage this project isn't attached to any user account. This is called the _onboarding project_.

5. __onboarding/project/{onboarding_project_id}/tasks__.
A polling function queries the tasks enpoint every 5 seconds, for a total of 100 times (8.3 minutes total). Loop completes if tasks array length is > 0.

6. __/onboarding/project/{onboarding_project_id}/update__.
Optionally used to update keyword in onboarding project if user decides to overwrite default selection from SEM Rush.

7. __account/create__.
Finally create a new Glasshat user account and attach the onboarding project to it.



