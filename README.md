# team42: Player One - The Player's Game Rating Platform
This project is an React application on game rating and sharing. To use this app, please follow the following steps.
## Install
1. clone git repo:
    ```
    git clone https://github.com/csc309-winter-2020/team42.git
    ```
2. go to project directory:
    ```
    cd team42/player-one
    ```
3. install dependencies: (both client and api components)
    ```
    cd client && npm install && cd ../api && npm install && cd ../
    ```
4. running mongoDB (keep it running)
    ```
    cd api && mkdir database-data && mongod --dbpath ./database-data
    ```
5. start the server (keep it running) **You must do this before step 6**
    ```
    cd api/ && npm start
    ```
6. pre populate the database with 26 games (assumes currently in ```team42/player-one/```)
    ```
    cd api/db/initial_data && node populate.js
    ```
7. start react (keep it running)
    ```
    cd client/ && npm start
    ```
## Important: Please do not refresh on the main page for many time, we have a very limited cloudinary quota

# The information below is out of date, and needs to be updated... (TODO)

## Run
This app is built with React, and in particular `create-react-app`, hence, to start you need to run
```
npm start
```
Now the app is running on `http://localhost:3000`. Please open it in a browser to view this app.  
## Main Page
Once you open up `http://localhost:3000`, you can see the main page for our site. It is consist of the following
- A navigation bar at the top, with game categories for users to choose games to browse as well as login and
sign up buttons. 
- Five pictures of 5 featured games shown as Carousel Slides. Currently all the games shown are the same, which
is Wither 3, but it will be infused with possibly dynamically loaded pictures in phase 2. The Carousel sides is
set to be auto play with stop of 5 seconds for each picture. 
- Below the large carousel slides, is the section for showing games from different categories. There will be a
short description for each game category and pictures of some selected games. Again, these are all now the same
game, but they will be infused with a bunch of different games during phase 2. Stay tuned!



## Available Login Credentials
You can login to the app by clicking the `SIGNIN` button at the top right of the main page. 
There are the following three login credentials hardcoded into our app currently, they are
 - For user: username `user` with password `user`, it is intended to be a normal player's user account. 
 - For superuser: username `superuser` with password `superuser`. A super user represents a professional agency, could be game rating company or game makers, etc.
 - For admin: username `admin` with password `admin`; This is the account of the admin of the site. Unlike the previous two types of users, an admin is allowed to modify other users' data, including but not limited to changing password, adding user, deleting user. 

**The Sign Up Page** could be accessed by clicking the `SIGNUP` button besides `SIGNIN`.



## Account Page For User/ Superuser
An user (superuser or user) has access to his/her own account page after successful login. An account page is where a user can view/edit profile and view recent activities.
To go to the account page, please click `My Account` in the dropdown menu displayed when you hover your mouse over the username at the top right corner.

In the account page, an user is currently able to:
- edit his/her handle name by clicking the pencil icon next to it
- view the total number of his/her reviews and likes received for them
- view his/her personal bio
- add a new tag to describe himself/herself or his/her favorite games
- view a list of recently liked games and go to that game page by clicking the link
- view a list of recent reviews and go to that games page by clicking the link
## Manage Page For Admin
After successful login, an admin user can access the Manege page by clicking `Manage` in the dropdown menu displayed when
hovering mouse over the admin user name. *Due to the hardcoded nature of this app, this management interface is not connected to anything else, and is for the purpose of demonstrating layout.*

In the Admin page, he/she can 
- Manage Users
    - Add a new user by providing Username and Password
    - View all the current user in the system. 
    - Override an existing user's password by entering a new password in the `NewPassword` field and click on the `UPDATE` button, after which an alert will show, prompting the username of the user and the new password. 

- Manage Games 
    - Add a new game by entering the name of the game and description of a game and click `ADD GAME`
    - Remove a game by clicking `REMOVE` button in the game entry.
    

## Game Page
Anyone can view the game page without signing in into the app, however, for he/she to make a comment/long comment depending on the type of user that he/she is, logging in is required.
There is one hardcoded game page in the app now, you can access it by hovering your mouse over any of the categories shown
in the top navigation bar and click `The Witcher 3: Wild Hunt`. You can also access it by going to
``````
http://localhost:3000/the_witcher_3_wild_hunt
``````
There should be four selected pictures for the game, and with thumbnails for all of them shown to the left of the screen
and to the right is a short description, usually from the game developer, and related stats/info for the game. 
Also, there is one 'selected' comment from the short comments chosen to be displayed below the general stats 
for the game. The username of the user who left the comment is also shown.

Below, is the section for comments. Each of the long comment is inside a expansion
menu, and anyone can view it by clicking on the title text. At the bottom of each of the expanded long coments, there are three buttons, namely `AGREE`, `HUMM, NOPE` and `FUNNY`. Each of the three buttons have a counter associated with them and the number of hits is updated in real time as users click the button. Of course, these are all just dummy hard-coded data and not synchronized with any source of data outside. (**Aside:** these buttons are only available for a user to click once they have logged in. It will be showned disabled by someone who has not logged in.) 

After the long comment section, what a user can see below varies with the type
of the user:
- **For Admin:** We think admin should be limited to his/her own job and should not use the admin account for personal 
opinion, for example, like writing a comment. Hence, unfortunately, the admin's view of the game page 
is the same as an not-logged-in user's. In particular, the comment input section down below is disabled for
admin, just like when the user has not logged in.
- **For User:** A general user can add comment for games. As you can see, there are already
four hardcoded comments, and the user can add his/her new comment by typing 
a new comment message in the text input box and then hitting the `SUBMIT` button below. The new comment
will be added to the *top* of existing comment list. Note: The current policy for these short comments
is that it has to be longer than 30 characters (informative) and less than 500 characters (not too long). Also, the submitted
comment will replace all the newline 'returns' with spaces. We did this because it is possible that some
malicious user type a lot of returns in some comment and this might ruin the user experience for others.
- **For Superuser:** A super user can also leave comments, and in addition to that, he/she can add long
comments for the game. By clicking the `want to share your review?` expansion panel, the super user can see
an interface for entering a new long comment. As opposed to short comments, long comments have to be at least
500 characters long. 



