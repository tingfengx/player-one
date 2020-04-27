import React, { Component } from "react";
import { withCookies } from "react-cookie";
import ScrollableTabsButtonPrevent from "./ActivityTabs"
import "./styles.css";


const log = console.log
const baseURL = ''
const origin = ''
const gameURL = origin + '/viewgames/'


class UserActivities extends Component {
    constructor() {
        super()
        this.state = {
            comments: [],
            likes: []
        }
    }

    async componentDidMount() {
        const userId = this.props.cookies.cookies.user_id
        const userURL = baseURL + '/users/' + userId


        let allLikes = []
        let allComments = []

        const userRequest = new Request(userURL, {
            method: 'get',
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        const userRequestResposne = await fetch(userRequest);
        if (userRequestResposne.ok) {
            const userRequestData = await userRequestResposne.json();
            const likedGames = userRequestData.likedGames;

            for (let i = 0; i < likedGames.length; i++) {
                let gameId = likedGames[i]
                let url = baseURL + '/games/' + gameId

                let request = new Request(url, {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                })

                const response = await fetch(request);
                if (response.ok) {
                    try {
                        const json = await response.json();
                        let obj = {
                            gameName: json.game.gameName,
                            gameURL: gameURL + json.game._id,
                            gamePicture: json.game.gamePictures[0]
                        }
                        allLikes.push(obj)
                    } catch (e) {
                        log(e);
                    }
                    
                } else {
                    log("Failed fetching games");
                }
            }

            this.setState({ likes : allLikes })

        } else {
            log("Failed fething user")
        }

        /**Original */
        const commentsURL = baseURL + '/games/comments/byUser/' + userId

        const commentsRequest = new Request(commentsURL, {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })

        const commentsResponse = await fetch(commentsRequest);
        if (commentsResponse.ok) {
            const data = await commentsResponse.json();
            allComments = [...data.shortComments, ...data.longComments];
            for (let i = 0; i< allComments.length; i++) {
                let commentTime = new Date(allComments[i].time).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ")
                    allComments[i].time = commentTime
                    let gameId = allComments[i].gameCommented
                    let url = baseURL + '/games/' + gameId

                    let request = new Request(url, {
                        method: 'get',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        }
                    })

                    const resp = await fetch(request);
                    if (resp.ok) {
                        try {
                            const resjson = await resp.json();
                            let obj = {
                                gameName: resjson.game.gameName,
                                gameURL: origin + '/viewgames/' + resjson.game._id,
                                gamePicture: resjson.game.gamePictures[0]
                            }
                            let tempComment = allComments[i]
                            let newComment = Object.assign({}, tempComment, { gameInfo: obj })
                            allComments[i] = newComment
                        } catch (e) {
                            log(e);
                        }
                    } else {
                        log("Failed fetching games")
                    }
            }

            this.setState({ comments: allComments })

        } else {
            log("Failed fetching comments");
        }
    }

    render() {
        return (
            <div className="activityContainer">
                <ScrollableTabsButtonPrevent likes={this.state.likes} comments={this.state.comments}  />
            </div>
        );
    }
}

export default withCookies(UserActivities);