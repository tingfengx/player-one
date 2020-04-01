const l = console.log;
const baseURL = "http://localhost:5000";

/**
 * @param Union({Comment}, {LongComment}, {Game}) item 
 * Updates thumbup/thumbdown/funny numbers on the server.
 */
export function serverUpdateButtons(item) {
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
                gamePictures: item.gamePictures,
                gameName: item.gameName,
                publisher: item.publisher,
                developer: item.developer,
                releaseDate: item.releaseDate,
                genre: item.genre,
                thumbUp: item.thumbUp,
                thumbDown: item.thumbDown
            })
        });
        fetch(request).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                console.log(res);
                return;
            }
        }).then(res => {
            // l(res)
        }).catch(e => {
            l(e);
        })
    /**
     * Handle Updates in Comments...
     */
    } else {
        const isLong = typeof(item.commentBody) === "string" ? false : true;
        /**
         * Short Comments
         */
        if (!isLong) {
            const url = baseURL + "/games/comments/" + item._id;
            
            const request = new Request(url, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    thumbUp: item.thumbUp,
                    thumbDown: item.thumbDown,
                    funny: item.funny
                })
            });
            fetch(request).then(res => {
                if (! res.status === 200) {
                    console.log(res);
                    return;
                } else {
                    return res.json();
                }
            }).then(res => {
                // l(res)
            }).catch(e => {
                l(e);
            });
        /**
         * Long Comments
         */
        } else {
            const url = baseURL + "/games/comments/" + item._id;
            
            const request = new Request(url, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isLong: true,
                    thumbUp: item.thumbUp,
                    thumbDown: item.thumbDown,
                    funny: item.funny
                })
            });
            fetch(request).then(res => {
                if (! res.status === 200) {
                    console.log(res);
                    return;
                } else {
                    return res.json();
                }
            }).then(res => {
                // l(res)
            }).catch(e => {
                l(e);
            });
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

export function addShortCommentRequest(username, gameName, shortCommentContent) {
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
            gameCommented: gameName,
            commentBody: shortCommentContent,
            thumbUp: 0,
            thumbDown: 0,
            funny: 0
        })
    });
    fetch(request).then(res => {
        if (! res.status === 200) {
            console.log(res);
        } else {
            return res.json()
        }
    }).then(res => l(res));
}

export function addLongCommentRequest(newLongComment, gameName, commenter) {
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
            gameCommented: gameName,
            commenter: commenter,
            commentBody: newLongComment.commentBody,
            thumbUp: 0,
            thumbDown: 0,
            funny: 0
        })
    });
    fetch(request).then(res => {
        if (! res.status === 200) {
            console.log(res);
        } else {
            return res.json()
        }
    }).then(res => l(res)).catch(e => l(e));
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
