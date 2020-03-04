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
3. install dependencies:
```
npm install
```
## Run
run the React application:
```
npm start
```
Now the app is running on `http://localhost:3000`. Please open it in a browser to view this app.  
## Available Login Credentials
You can login to the app by clicking the `SIGNIN` button at the top right of the main page. 
There are the following three login credentials hardcoded into our app currently, they are
 - For user: username `user` with password `user`, it is intended to be a normal player's user account. 
 - For superuser: username `superuser` with password `superuser`. A super user represents a professional agency, could be game rating company or game makers, etc.
 - For admin: username `admin` with password `admin`; This is the account of the admin of the site. Unlike the previous two types of users, an admin is allowed to modify other users' data, including but not limited to changing password, adding user, deleting user. 

**The Sign In page** could be accessed by clicking the `SIGNUP` button besides the `SIGNIN`.



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

Below, is the section for comments. Each of the long comment is inside a expansion
menu, and anyone can view it by clicking on the title text. What a user can see below varies with the type
of the user.
- **For Admin:** We think admin should be limited to his/her own job and should not use the admin account for personal 
opinion, for example, like writing a comment. Hence, unfortunately, the admin's view of the game page 
is the same as an not-logged-in user's. 
- **For User:** A general user can add comment for games. As you can see, there are already
three hardcoded comments with lorem ipsum text, and the user can add his/her new comment by typing 
a new comment message in the text input box



