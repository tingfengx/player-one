import React, { Component } from "react";
import { withCookies } from "react-cookie";
import ScrollableTabsButtonPrevent from "./ActivityTabs"
import "./styles.css";


const log = console.log
const baseURL = 'http://localhost:5000'
const origin = 'http://localhost:3000'


class UserActivities extends Component {
    constructor() {
        super()
        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        const userId = this.props.cookies.cookies.userId
        const commentsURL = baseURL + '/games/comments/byUser/' + userId

        const commentsRequest = new Request(commentsURL, {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })

        fetch(commentsRequest)
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    log('Failed fetching comments')
                }
            })
            .then((data) => {
                const allComments = [...data.shortComments, ...data.longComments]
                for (let i = 0; i < allComments.length; i++) {
                    let gameId = allComments[i].gameCommented
                    let url = baseURL + '/games/' + gameId

                    let request = new Request(url, {
                        method: 'get',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        }
                    })

                    fetch(request)
                        .then((res) => {
                            if (res.status === 200) {
                                log(res)
                                return res.json()
                            } else {
                                log('Failed fetching games')
                            }
                        })
                        .then((json) => {
                            log(json)
                            let obj = {
                                gameName: json.game.gameName,
                                gameURL: origin + '/games/' + json.game._id,
                                gamePicture: json.game.gamePictures[0]
                            }
                            let tempComment = allComments[i]
                            let newComment = Object.assign({}, tempComment, { gameInfo: obj })
                            allComments[i] = newComment
                        })
                        .catch((error) => {
                            log(error)
                        })
                }

                this.setState({
                    comments: allComments
                }, () => {
                    log(this.state)
                })
            })
            .catch((error) => {
                log(error)
            })
    }

    render() {
        return (
            <div class="activityContainer">
                <ScrollableTabsButtonPrevent comments={this.state.comments} />
            </div>
        );
    }
}

export default withCookies(UserActivities);