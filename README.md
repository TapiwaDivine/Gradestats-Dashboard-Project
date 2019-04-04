# Gradestats Dashboard Website
This project is a single page dashboard to review students scores in 3 subjects. The website is a scores based single page which try to reveal the influences behind students scores at a given school and the common score ranges of students.
We look at the average pass rate by students ethnicity, compare the pass percentage scores by students who took test prepartion coarse against the pass percent of students who didnt take the preparation test coarse. We also compare the students who failed in their subjects against the lunch the had. The is a visual data display which tries to look at the student score from diferent angles 
## Content Table

1. [UX](#UX)
2. [Features](#Features)
    +   1. [Existing Features](#existing-features)
    +   2. [Features Left to Implement](#features-left-to-implement)
3. [Technologies Used](#technologies-used)
4. [Testing](#testing)
6. [Deployment](#deployment)
7. [Credits](#credits)
    +   1. [Content](#content)
    +   2. [Media](#media)
    +   3. [Acknowledgements](#acknowledgements)


## UX

1. This Website is a dashboard of a given school to give a data view in student scores:
    +  the dashboard reviews average scores for 3 subjects using barCharts
    +  the project also reviews the pass percentages between students who took the Test Preparation test and students who did not take the Test Preparation test we use a piechart to do the comparison.
    +  the projrct also reviews the student who failed comparing percentage of student who had standard lunch  who failed vs the ones who had free or reduced lunch who failed.
    
2. Colours : The theme colour selected was blue because the it is the default color of the dc charts. So i had to make my charts colorful but not too bright for the theme color 
3. Pages : this is a single page only project. with a click on scroll navigation.
4. Mock up : ![websitesketch](/static/images/websitesketch.jpg)
    

## Features

### Existing Features
- Feature 1 - the website has a fixed navbar which some of the code resourced from getbootstrap.com which i adjusted a little  to suit what i wanted on this navbar.
- Feature 2 - On this website vistors can get to analyse the overview of all the scores to and assess the general perfomance of all students 
- Feature 3 - The project offers a data display of score by each suabject
- Feature 4 - The score ranges section offer is also a key area in the project as it shows vistors the score ranges which were common among students.
- Feature 5 - I kept the footer simple and clean. On the footer we got put contacts and social media link to enable the vistors get in touch with and be able to follow us for other information on social media 

### Features Left to Implement

- the website could benefit from a application form and submit button to enrol student.
- It could also have a line graph displaying students perfomances in different years.


## Technologies Used

- On the project i used bootstrap to structure the website columns and make it fully responsive.
- I also used font-awesome to give some nice decorations when necessary
- D3.js, dc.js charts to display the data with chart
- In this project i used crossfilter.js, bootstrap.css and dc.css to help display data in an intuitive way:
- This project was predominately a Javascript project shows how powerful a language Javascript is

## Testing

- The website is responsive on all pages and though there is gap on the home page when its on the mobile size screens.
- I used chrome developer tools test the website's responsiveness
- I also manually tested the website at every point of development. 
- The all charts have been tested and they are working well.

## Deployment
- This project was done in cloud9 ide and deployed with bash terminal using git to push the codes to github.
https://github.com/TapiwaDivine/Gradestats-Dashboard

## Credits
- In this project i relied heavily with the coarse material in the video lesson. I also used use codes from other soureces listed in the content section

### Content
- getbootstrap.com
- bootstrap.md 
- stackflow
- w3schools.com
- https://kids.lovetoknow.com/wiki/What_Do_Kids_Think_About_School_Uniforms

### Media
- the hero-image used in the section-showcase section was downloaded from https://kids.lovetoknow.com/wiki/What_Do_Kids_Think_About_School_Uniforms

### Acknowledgements
- I drew inspiration from idashboards.com/solutions/k-12-education-dashboards and caschooldashboard.org
- I also acknowledge the influence of stackflow in this project and traversy Media youtube channel
- Also the review and advise from Mentor and Nakita tutor support at code institute