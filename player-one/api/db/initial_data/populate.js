// NODE RUN

const allGames = require('./games_info_start');
const fetch = require('node-fetch');

for (let i = 0; i < allGames.allGames.length; i++) {
    const game = allGames.allGames[i];
    // console.log(game);
    // fetch the request
    fetch("http://localhost:5000/games/addGame/", {
        method: 'post',
        body: JSON.stringify(game),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    }).then(res => {
        console.log(res);
        if (res.status === 200) {
            return res.json()
        } else {
            console.log(res)
        }
    }).then(data => {
       
    }).catch(e => console.log(e))
}