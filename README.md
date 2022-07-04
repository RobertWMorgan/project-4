# project-4 Brogress
[Link to project]

Brogress was the 4th project I made during the GA SEI course. This was a 10 day solo project where we had to produjce a fullstack project using Django, PSQL and React. 

The idea behind the project was to make a gym calendar site where you could track your progress and add notes to the different exercises you did on any given day. 

### Project Plan

![Project Wireframe](client/public/images/Screenshot%202022-06-27%20at%2014.14.49.png)

This was the original wireframe for the gym app. I did end up having to change how things worked because of limitations with the libraries/packages I chose to use.

![Backend Setup](client/public/images/Screenshot%202022-06-08%20at%2016.59.25.png)

This was how I initially envisioned the SQL DB structure.


### Technologies Used

#### PSQL

I had 3 different models that I used. One for the User, the different exercises and each journal note. At first I found these tricky to use as I was used to nosql databases however as I 
used it more it started to make more sense. The relationships I had were one to many with the Users and each exercise as well as one to many with each journal note and exercises. 

#### Django

Django was used for the Backend side and all the API calls. This was my first time using Python and found it challenging due to unfamiliarity.


#### React

React was used for the front-end. Along with React for the front-end, I used React-Calendar and bootstrap to get the main features working.

### The Approach:

#### Days 1-3

After I finished the basic plan of the site, I worked on getting the basic front-end working and experimenting with React Calendar. I had never used this before so 
I spent a day familiarising myself with it and seeing if it was suitable for the project. During my initial testing, I realised that it was quite restrictive of what 
additional features you could add to this. Becuase of this, I had to adapt my initial plan of using modals for data entry and instead do a split-screen view. 

I also couldn't find any prebuilt sidebar-navigation components using different CSS libraries and started to work on building a custom one. This needed to have a couple 
different functions such as checking if the user was authenticated and knowing where the user was currently navigated to so it could highlight the correct navigation button. 

#### Days 4-7

I spent most of the mid-section of the project getting the backend working. This included building all of the models and creating the different API routes. I had never used both Python or 
SQL databases before so this took longer than I would have hoped and I also ran into some issues that I wasn't able to fix properly and had to create bandaid solutions for. Issues such as API 
routes not working correctly and having to merge some of my routes. 

After finishing the backend I also started work on getting it to work on the frontend. This wasn't too hard as my fullstack app was already connected.

#### Days 7-10

The rest of the days were spent finalising features, seeding the database and finishing the styling. I didn't have the most time for this project so I think the styling could have been improved on 
and I also think that the code could be refactored to be made more readable and efficient. 


### Key Learnings
- Python basics
- SQL basics
- Using React Calendar

### Challenges
- The main challenge that I had was time management over the project. I had forgotten how long it took to do things solo and had to adjust my schedule accordingly.
- Using Python for the first time with little experience was challenging.

### Future Improvements
- I would like to improve the styling of the site as currently it looks quite boring. 
- Add the ability to add a new exercise on the calendar page.
- Clean up the code as it's not dry.
