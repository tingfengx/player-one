// Methods in this file modifies the Queue component state

const log = console.log;
const baseURL = "http://localhost:5000";
// Function to add a student, needs to be exported

export async function getAllusers() {
    const url = baseURL + "/users";
    const request = new Request(url, {
        method: "get",
        credentials: "include",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
    const response = await fetch(request);

    if (!response.ok) {
        log(response);
    } else {
        const data = await response.json();
        log("data is " + data);

        return data;
    }
}



export async function getAllgames() {
    const url = baseURL + "/games";
    const request = new Request(url, {
        method: "get",
        credentials: "include",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
    const response = await fetch(request);

    if (!response.ok) {
        log(response);
    } else {
        const data = await response.json();
        log("data is " + data);

        return data;
    }
}

export async function getGameById(gameId){
    const url = baseURL + "/games/" + gameId;
    const request = new Request(url, {
        method: "get",
        credentials: "include",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
    const response = await fetch(request);

    if (!response.ok) {
        log(response);
    } else {
        const data = await response.json();
        log("data is " + data);

        return data;
    }
}


export async function uploadGamePics(e){
    const cloudinaryURL = "https://api.cloudinary.com/v1_1/dzld6bb6y/image/upload";
    const formData = new FormData();
    formData.append('file', e.target.files[0])
    formData.append('upload_preset', 'wzgg2ljz')
    // formData.append('folder', 'user_account')
    formData.append('folder', 'game_pics')


    const uploadRequest = new Request(cloudinaryURL, {
        method: "post",
        body: formData
    })

    let imageURL;
    const response = await fetch(uploadRequest);

    if (!response.ok) {
        log(response);
    } else {
        const data = await response.json();
        log("data is " + data);

        return data;
    }


    // fetch(uploadRequest)
    //     .then(function (res) {
    //         if (res.status === 200) {
    //             log('Successfully uploaded game pictures!')
    //             const data = res.json();
    //             return res.json()
    //         } else {
    //             log('Failed uploading game pictures.')
    //         }
    //     }).then((data) => {
        // imageURL = data.url
        // const toAddURL = baseURL + '/games/' + tochangeId;
        // const toaddRequest = new Request(toAddURL, {
        //     method: 'put',
        //     credentials: 'include',
        //     headers: {
        //         'Accept': 'application/json, text/plain, */*',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ 'avatarId': imageURL })
        // })
    // })

}
//     fetch(request)
//         .then(async function (res) {
//             log("res" + res);
//
//             // Handle response we get from the API.
//             // Usually check the error codes to see what happened.
//             log(`get all users status is ${res.status}`)
//             if (res.status === 200) {
//                 // If image was added successfully, tell the user.
//                 const data = await res.json();
//                 log("res.json()" + data[0].username)
//                 // log("res.json is " + res.json());
//                 return data;
//             } else {
//                 // If server couldn't add the image, tell the user.
//                 // Here we are adding a generic message, but you could be more specific in your app.
//                 this.setState({
//                     message: {
//                         body: "Error: Could not add image.",
//                         type: "error"
//                     }
//                 });
//             }
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }

export const addUser=queue=>{
    // the URL for the request
    const url = baseURL + "/users";

    // const url = "/users";
    const userList = queue.state.users;


    // The data we are going to send in our request
    // const imageData = new FormData(form);
    log("user type " + queue.state.userType);
    if(queue.state.username.length <1){
        alert("please enter a user name!");
        return;
    }
    if (!(queue.state.userType === "user" || queue.state.userType === "superuser")){
        alert("not a valid userType");
        return;
    }
    if(queue.state.password.length < 4){
        alert("password too short");
        return;
    }
    const user = {
        username: queue.state.username,
        password: queue.state.password,
        userType: queue.state.userType
    };

    let indicator = 0;
    for(let i = 0; i < userList.length; i++){
        if (userList[i].username === user.username){
            log(userList[i].username)
            indicator = 1;
        }

    }
    if (indicator === 1){
        alert("the user name has been taken, please choose another one!");
        return;
    }else {
        log("new user is " + user.username + user.password)

        // Create our request constructor with all the parameters we need
        const request = new Request(url, {
            method: "post",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        // userList.unshift(user);

        queue.setState({
            users: userList,
            message: {
                body: "Success: Added an image.",
                type: "success"
            }
        });
        // Send the request with fetch()
        fetch(request)
            .then(function (res) {
                log("res" + res);

                // Handle response we get from the API.
                // Usually check the error codes to see what happened.
                log(`status is ${res.status}`)
                if (res.status === 200) {
                    // If image was added successfully, tell the user.
                    userList.unshift(user);
                    queue.setState({
                        users: userList,
                        message: {
                            body: "Success: Added an image.",
                            type: "success"
                        }
                    });
                    return res.json();
                } else {
                    // If server couldn't add the image, tell the user.
                    // Here we are adding a generic message, but you could be more specific in your app.
                    queue.setState({
                        message: {
                            body: "Error: Could not add image.",
                            type: "error"
                        }
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
        // }
    }

};




export async function removeGame(queue,gameId, getallGames) {

    // const getallGames = await getAllgames();

    const url = baseURL + "/games/" + gameId;

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "delete",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    fetch(request)
        .then(async function (res) {

            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {

                const data = await res.json();
                console.log("data is " + data.game._id);

                let gameList = [];

                for(let i = 0; i < getallGames.hottestGamesForGenre.length; i++){
                    for (let j = 0; j < getallGames.hottestGamesForGenre[i].length; j++) {
                        if (getallGames.hottestGamesForGenre[i][j]._id !== data.game._id) {
                            log("id is" + getallGames.hottestGamesForGenre[i][j]._id)
                            log("jinlai llllllllllllllllll")
                            gameList.push(getallGames.hottestGamesForGenre[i][j]);
                        }
                    }

                    // this.state.users.push(userObj)
                }

                log("after remove length" + gameList.length);
                queue.setState({
                    games: gameList,
                    message: {
                        body: "Delete successful.",
                        type: "success"
                    }
                });
                log("wrnxrrrrrrr" + queue.state.games.length)
                return data;

            } else {
                // If server couldn't delete the image, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                queue.setState({
                    message: {
                        body: "Error: Could not delete image.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });

};

export async function addGame(queue,urlList){
    // the URL for the request
    const url = baseURL + "/games/addGame";
    log("zaiiiiiiiiiiiiiiiiii")

    // const url = "/users";
    const gameList = queue.state.games;

    // The data we are going to send in our request
    // const imageData = new FormData(form);
    if(urlList.length < 5){
        alert("please add 5 pictures!");
        return;
    }
    const game = {
        ////////////////////////to fixxxx
        gamePictures: urlList,
        gameName: queue.state.gameName,
        introductionText: queue.state.introductionText,
        publisher:queue.state.publisher,
        developer: queue.state.developer,
        genre: queue.state.genre,
        thumbUp: 0,
        thumbDown: 0,
        releaseDate: Date.now()

    };
    log("game"+ game.gameName + game.password + game.publisher + game.developer + game.genre)

    let indicator = 0;
    for(let i = 0; i < gameList.length; i++){
        if (gameList[i].gameName === game.gameName){
            log(gameList[i].gameName);
            indicator = 1;
        }

    }
    if (indicator === 1){
        alert("the game has been uploaded!");
        return;
    }else {
        // log("new user is " + game.gameName + game.password)

        // Create our request constructor with all the parameters we need
        const request = new Request(url, {
            method: "post",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(game)
        });
        // userList.unshift(user);

        queue.setState({
            users: gameList,
            message: {
                body: "Success: Added an image.",
                type: "success"
            }
        });
        // Send the request with fetch()
        fetch(request)
            .then(function (res) {
                log("res" + res);

                // Handle response we get from the API.
                // Usually check the error codes to see what happened.
                log(`status is ${res.status}`)
                if (res.status === 200) {
                    // If image was added successfully, tell the user.
                    gameList.unshift(game);
                    queue.setState({
                        games: gameList,
                        message: {
                            body: "Success: Added an image.",
                            type: "success"
                        }
                    });
                    return res.json();
                } else {
                    // If server couldn't add the image, tell the user.
                    // Here we are adding a generic message, but you could be more specific in your app.
                    queue.setState({
                        message: {
                            body: "Error: Could not add image.",
                            type: "error"
                        }
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
        // }
    }

};


// export const addUser = queue => {
//     log("adding Manager");
//     log("queue " + queue.state.__proto__);
//     const userList = queue.state.users;
//
//     const user = {
//         username: queue.state.username,
//         password: queue.state.password
//     };
//     console.log("user list " + userList);
//
//
//     userList.unshift(user);
//
//
//     queue.setState({
//         users: userList
//     });
// };

export function changePassword(userId, password) {
    /**
     * Request
     */
    const url = baseURL + "/users/" + userId + "/password";

    const request = new Request(url, {
        method: 'PUT',
        credentials: "include",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: password
        })
    });
    fetch(request).then(res => {
        if (! res.status === 200) {
            console.log(res);
            return;
        } else {
            console.log(res);
            return res.json()
        }
    }).then(res => {
        // l(res)
    }).catch(e => {
        log(e);
    });
}

export async function removeUser(queue,userId) {

    const allUsers = await getAllusers();

    const url = baseURL + "/users/" + userId;

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "delete",
        credentials: "include",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    fetch(request)
        .then(async function (res) {

            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {

                const data = await res.json();

                let userList = [];
                for (let i = 0; i < allUsers.users.length; i++){
                    if(allUsers.users[i]._id !== data._id){
                        userList.push(allUsers.users[i])
                    }

                }
                log("after remove length" + userList.length);
                queue.setState({
                    users: userList,
                    message: {
                        body: "Delete successful.",
                        type: "success"
                    }
                });
                return data;

            } else {
                // If server couldn't delete the image, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                queue.setState({
                    message: {
                        body: "Error: Could not delete image.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });

};


export const updateUser = (queue, user) => {

    // filters out the student we don't want.
    const targetUser = queue.state.users.filter(s => {
        // const targetUser = queue.state.users.filter(s => {
        return s === user;
    });

    //log(filteredStudents)

    queue.setState({
        users: targetUser
    });
};

export const handleEvent = (event, queue) => {
    let target = event.target;
    let value = target.value;
    const name = target.name;
    console.log("target" + target);
    // let selectedName = target.parentElement.firstElementChild;
    let newText = document.createElement("Input");
    newText.id = "inputId";

    target = target.replaceWith('newText');
    value = document.getElementById("inputId").value;

    queue.setState({
        [name]: value
    });


}