# team42: Player One
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
## Features: User
To sign in as a normal user, please click `SIGN IN` button in the top right corner and use username `user` with password `user`.
We are currently using username as the key, and have enabled three users: user, superuser and admin. The Topbar will show the name of the user after we login.  
 - for user: username `user` with password `user`  
 - for superuser: username `superuser` with password `superuser`  
 - for admin: username `admin` with password `admin`  


### Account Page
A user has access to his/her own account page after successful login. An account page is where a user can view/edit profile and view recent activities.
To go to the account page, please click `My Account` in the dropdown menu of the displayed username `USER` in the top right corner.

In the account page, a user is currently able to:
- edit his/her handle name by clicking the pencil icon next to it
- view the total number of his/her reviews and likes received for them
- view his/her personal bio
- add a new tag to describe himself/herself or his/her favorite games
- view a list of recently liked games and go to that game page by clicking the link
- view a list of recent reviews and go to that games page by clicking the link
## Features: Superuser
To sign in as a superuser, please click `SIGN IN` button in the top right corner and use username `superuser` with password `superuser`.
## Features: Admin
To sign in as a normal user, please click `SIGN IN` button in the top right corner and use username `admin` with password `admin`. We are able to access admin page by signing up as admin.  
In the Admin page, We can access the information of all current users with their passwords (where users' original password are not visible to admin) and all current games with their descriptions. The tab at the top of the page make it convinient for us to switch views of games and users.   
Admin is able to add or delete any users, and also changes users' password. When clicking on the user's password, it will show up an alert block saying `changing the user's password to whatever the admin has typed`.   
As for the games, he can also add or delete games with their descrpitions.  


### Login/Signup Page
By clicking the `sign up` button on the Topbar of home page, we will be able to jump to the sign in page. The signup page requires user name, password and re-typing password. Similarly, we jump to the Log in page by clicking the button `Log in` on the Topbar, we require username and password to log in.  
We are currently using username as the key, and have enabled three users: user, superuser and admin. The Topbar will show the name of the user after we login.  
 - for user: username `user` with password `user`  
 - for superuser: username `superuser` with password `superuser`  
 - for admin: username `admin` with password `admin`  

