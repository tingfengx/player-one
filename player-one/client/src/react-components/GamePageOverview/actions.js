const l = console.log;
const baseURL = "http://localhost:5000";

/**
 * @param Union({Comment}, {LongComment}, {Game}) item 
 * @param short: the short comment returned from server, should contain the id
 * @param long: the long commnet returned from server, should contain the id
 * 
 * ## short and long should be used eactly on the condition that
 *      1. item is a LongComment/Comment
 *      2. item._id is undefined.
 * 
 * Updates thumbup/thumbdown/funny numbers on the server.
 */
export async function serverUpdateButtons(item, short, long, username) {
    const isGame = item.publisher ? true : false;
    /**
     * Handle Games
     */
    if (isGame) {
        const url = baseURL + "/games/" + item._id;
        const request = new Request(url, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                game: {
                    gamePictures: item.gamePictures,
                    gameName: item.gameName,
                    publisher: item.publisher,
                    developer: item.developer,
                    releaseDate: item.releaseDate,
                    genre: item.genre,
                    thumbUp: item.thumbUp,
                    thumbDown: item.thumbDown
                },
                username: username
            })
        });
        const response = await fetch(request);
        if (response.ok) {
            const data = await response.json();
            l("after game like, data returned from server side!")
            l(data);
            return data;
        } else {
            l(response);
        }
    /**
     * Handle Updates in Comments...
     */
    } else {
        const isLong = typeof(item.commentBody) === "string" ? false : true;
        /**
         * Short Comments
         */
        if (!isLong) {
            const url = item._id ? baseURL + "/games/comments/" + item._id : baseURL + "/games/comments/" + short._id;
            
            const request = new Request(url, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    newCommentBody: short,
                    thumbUp: item.thumbUp,
                    thumbDown: item.thumbDown,
                    funny: item.funny,
                    username: username
                })
            });
            const response = await fetch(request);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                l(response);
            }
        /**
         * Long Comments
         */
        } else {
            const url = item._id ? baseURL + "/games/comments/" + item._id : baseURL + "/games/comments/" + long._id;
            
            const request = new Request(url, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // newCommentBody: long,
                    thumbUp: item.thumbUp,
                    thumbDown: item.thumbDown,
                    funny: item.funny,
                    username: username,
                    isLong: true
                })
            });
            const response = await fetch(request);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                l(response);
            }
        }
    }
}

export function editShortCommentRequest(comment) {
    /**
    * Request
    */
    const url = baseURL + "/games/comments/" + comment._id;
    
    const request = new Request(url, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newCommentBody: comment.commentBody,
            // edit will clear the state
            thumbUp: 0,
            thumbDown: 0,
            funny: 0
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
        l(e);
    });
}

export async function addShortCommentRequest(username, gameId, shortCommentContent) {
    l("inside addShortCommnetRequest, received shortCommentConent", shortCommentContent);
    /**
     * Request
     */
    const url = baseURL + "/games/addComment";
    
    const request = new Request(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            commenter: username,
            time: Date.now(),
            // changed to game id
            gameCommented: gameId,
            commentBody: shortCommentContent,
            thumbUp: 0,
            thumbDown: 0,
            funny: 0
        })
    });
    const response = await fetch(request);
    if (! response.ok) {
        l(response);
    } else {
        const data = await response.json();
        return data;
    }
}

export async function addLongCommentRequest(newLongComment, gameId, commenter) {
    // const newLongComment = {
    //     title: title,
    //     commentBody: this.state.longCommentContent.split(/\r?\n/),
    //     thumbUp: 0,
    //     thumbDown: 0,
    //     funny: 0,
    //     commenter: username,
    //     time: Date.now()
    // };
    const url = baseURL + "/games/addComment";
    
    const request = new Request(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // mark as long comment
            isLong: true,
            title: newLongComment.title,
            time: newLongComment.time,
            // changed to gameId 
            gameCommented: gameId,
            commenter: commenter,
            commentBody: newLongComment.commentBody,
            thumbUp: 0,
            thumbDown: 0,
            funny: 0
        })
    });
    const response = await fetch(request);
    if (! response.ok) {
        l(response);
    } else {
        const data = await response.json();
        return data;
    }
}

export function requestShortCommentDelete(shortComment) {
    console.log(shortComment);
    const url = baseURL + "/games/comments/" + shortComment._id;

    const request = new Request(url, {
        method: 'delete',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            
        })
    })

    fetch(request).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            console.log(res)
        }
    }).then(res => l(res)).catch(e => l(e));
}

export function requestLongCommentDelete(longComment) {
    console.log(longComment);
    const url = baseURL + "/games/comments/" + longComment._id;

    const request = new Request(url, {
        method: 'delete',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            isLong: true
        })
    })

    fetch(request).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            console.log(res)
        }
    }).then(res => l(res)).catch(e => l(e));
}
