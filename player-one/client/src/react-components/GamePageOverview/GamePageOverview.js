import React, {Component} from "react";
import Slider from "react-slick";
import './styles.css'
import {withCookies} from "react-cookie";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DislikeIcon from '@material-ui/icons/ThumbDown';
import LikeIcon from '@material-ui/icons/ThumbUp';
import WriteIcon from '@material-ui/icons/BorderColor'
import FunnyIcon from '@material-ui/icons/VideogameAsset';
import DeleteIcon from '@material-ui/icons/Delete';
import EmotionIcon from '@material-ui/icons/EmojiSymbols'
import Button from '@material-ui/core/Button'
import game from "./the_withcher_3_wild_hunt"
import {uid} from 'react-uid'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import {Card, List} from "@material-ui/core";
import ShortComment from '../ShortComment';
import Divider from "@material-ui/core/Divider";
import { 
    serverUpdateButtons, 
    editShortCommentRequest,
    addShortCommentRequest,
    addLongCommentRequest,
    requestShortCommentDelete,
    requestLongCommentDelete
} from "./actions";

const l = console.log;
/**
 * TODO: Change this before deployment
 */
const baseURL = "http://localhost:5000"

let bestShort = {};
for (let i = 0; i < game.shortComments.length; i++){
    if (game.shortComments[i].best)
        bestShort = game.shortComments[i];
}

class GamePageOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgs: [],
            longCommentContent: '',
            longCommentTitle: '',
            shortCommentContent: '',
            bestShort: bestShort
        };
        // "game" used in this page; 
        this.game = {
            gamePictures: [],
            // liked and disliked users;
            likedUsers: [],
            dislikedUsers: [], 
            gameName: "", 
            publisher:"", 
            developer: "", 
            introductionText: "",
            releaseDate: "",
            genre: "",
            thumbUp: 0,
            thumbDown: 0,
            longComments: [],
            shortComments: []
        };
        /**
         * used to cache returned new comments that the user has just addded,
         * especially used to cache the id of the comment that the user just added.
         * 
         * Should be used in the following two cases:
         *  1. the user just left the comment and tries to click like/unlike/funny button
         *  2. the user just left the comment and modified it and then tries 
         *      to click like/unlike/funny button
         */
        this.serverRetNewShortComment = undefined;
        this.serverRetNewLongComment = undefined;
    }

    componentDidMount = () => {
        const url = baseURL + '/games/' + this.props.match.params.gameId

        const request = new Request(url, {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
        // fetch the request
        fetch(request).then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log("something wrong happened");
                console.log(res);
            }
        }).then(data => {
            /*** full game ***/
            this.game = data.game;
            this.game.longComments = data.longComments;
            this.game.shortComments = data.shortComments;
            this.setState({imgs: data.game.gamePictures.slice(-4)});

            // console.log("full game loaded!");
            // console.log(data.game);
        }).catch(e => console.log(e))
    }

    handleLongCommentDelete(longComment) {
        const index = this.game.longComments.indexOf(longComment);
        if (index > -1) {
            this.game.longComments.splice(index, 1);
            this.forceUpdate();
            requestLongCommentDelete(longComment);
            return;
        }
        alert("Long comment not found!");
        return;
    }

    handleShortCommentDelete(shortComment) {
        const index = this.game.shortComments.indexOf(shortComment);
        if (index > -1) {
            this.game.shortComments.splice(index, 1);
            this.forceUpdate();
            requestShortCommentDelete(shortComment);
            return;
        }
        alert("Short comment not found!");
        return;
    }

    /////////////// handle buttons //////////////
    // item cloud be Long Comment / Short Comment / Game
    async handleThumbUp(item, username) {
        // clone the item
        const itemClone = JSON.parse(JSON.stringify(item));
        // increment the item's thumbUp
        itemClone.thumbUp += 1;
        // call server to increment the thumbUps
        const serverRet = await serverUpdateButtons(itemClone, 
            this.serverRetNewShortComment, 
            this.serverRetNewLongComment, username);
        if (!serverRet) {
            alert("Something wrong happened...");
        } else {
            item.thumbUp = serverRet.thumbUp;
            item.thumbDown = serverRet.thumbDown;
            this.forceUpdate();
        }
        
        l("handling thumbs up, server returned ", serverRet);
    }

    async handleThumbDown(item, username) {
        // clone the item
        const itemClone = JSON.parse(JSON.stringify(item));
        // increment the item's thumbDown
        itemClone.thumbDown += 1;
        // call server to increment the thumbDowns
        const serverRet = await serverUpdateButtons(itemClone, 
            this.serverRetNewShortComment, 
            this.serverRetNewLongComment, username);
        // update the numbers
        if (!serverRet) {
            alert("Something wrong happened...");
        } else {
            item.thumbDown = serverRet.thumbDown;
            item.thumbUp = serverRet.thumbUp;
            this.forceUpdate();
        }
        l("handling thumbs down, server returned ", serverRet);
    }

    async handleFunny(item, username) {
        item.funny += 1;
        this.forceUpdate();
        const serverRet = await serverUpdateButtons(item, 
            this.serverRetNewShortComment, 
            this.serverRetNewLongComment, username);
        l("handling funny, server returned ", serverRet);
    }
    /////////////////////////////////////////////

    handleTypeShortComment(event) {
        event.preventDefault();
        this.setState({shortCommentContent: event.target.value});
        // l(this.state.shortCommentContent)
    }

    handleEditShortComment(username) {
        for (let i = 0; i < this.game.shortComments.length; i++) {
            if (this.game.shortComments[i].commenter === username) {
                if (this.state.shortCommentContent.length <= 30) {
                    alert("Please try to be informative! Share your thoughts! Enter more than 30 characters.");
                    return;
                }
                if (this.state.shortCommentContent.length >= 500) {
                    alert("Sorry, your comment was too long. Please try to be brief... (limit is 500 characters)");
                    return;
                }
                if (this.state.shortCommentContent === this.game.shortComments[i].commentBody){
                    alert("Edited review should not have the same content!");
                    return;
                }
                const currrentShortComment = this.game.shortComments[i];
                currrentShortComment.commentBody = this.state.shortCommentContent;
                currrentShortComment.thumbUp = 0;
                currrentShortComment.thumbDown = 0;
                currrentShortComment.funny = 0;
                this.forceUpdate();
                editShortCommentRequest(currrentShortComment);
                return;
            }
        }
        alert('Review not found!');
        return;
    }

    async handleAddShortComment(username) {
        for (let i = 0; i < this.game.shortComments.length; i++) {
            if (this.game.shortComments[i].commenter === username) {
                alert("Every player can only submit ONE review per game!");
                return;
            }
        }
        if (this.state.shortCommentContent.length <= 30) {
            alert("Please try to be informative! Share your thoughts! Enter more than 30 characters.");
            return;
        }
        if (this.state.shortCommentContent.length >= 500) {
            alert("Sorry, your comment was too long. Please try to be brief... (limit is 500 characters)");
            return;
        }
        // prepend
        l(this.game.shortComments);
        this.game.shortComments.unshift({
            "gameCommented": this.game.gameName,
            "commenter": username,
            "commentBody": this.state.shortCommentContent,
            "thumbUp": 0,
            "thumbDown": 0,
            "funny": 0,
            "time": Date.now()
        });
        l(this.game.shortComments);
        this.forceUpdate();
        // await the return value, otherwise will be a unresolved promise
        const newShortComment = await addShortCommentRequest(username, this.game._id, this.state.shortCommentContent);
        // save this new comment state
        this.serverRetNewShortComment = newShortComment;
        l("server returned the following new short comment:")
        l(this.serverRetNewShortComment);
    }

    async handleAddLongComment(username) {
        for (let i = 0; i < this.game.longComments.length; i++) {
            if (this.game.longComments[i].commenter === username) {
                alert("Every professional agency can only submit ONE long review per game!");
                return;
            }
        }
        if (this.state.longCommentContent.length < 500) {
            alert("Review body need to be no less than 500 characters!");
        } else if (this.state.longCommentTitle.length === 0) {
            alert("Forget to add a title to the review!");
        } else if (this.state.longCommentTitle.length > 80) {
            alert("Title too long - please keep within 80 characters!");
        } else {
            const title = this.state.longCommentTitle;
            const newLongComment = {
                title: title,
                commentBody: this.state.longCommentContent.split(/\r?\n/),
                thumbUp: 0,
                thumbDown: 0,
                funny: 0,
                commenter: username,
                time: Date.now()
            };
            l(this.game.longComments.commentBody);
            this.game.longComments.push(newLongComment);

            // server request
            const returnedNewLongComment = await addLongCommentRequest(newLongComment, this.game._id, username);
            // cache the return value
            this.serverRetNewLongComment = returnedNewLongComment;

            this.setState({longCommentContent: ''});
            this.setState({longCommentTitle: ''});
            this.forceUpdate();
        }
    }

    handleLongCommentTitleChange(e) {
        e.preventDefault();
        this.setState({longCommentTitle: e.target.value});
    }

    handleLongCommentContentChange(e) {
        e.preventDefault();
        this.setState({longCommentContent: e.target.value});
        l(this.state.longCommentContent);
    }

    round(num) {
        return Math.round((num + Number.EPSILON) * 100) / 100
    }

    reviewTier() {
        const rating = this.game.thumbUp / (this.game.thumbUp + this.game.thumbDown);
        if (isNaN(rating)) {
            return "N/A";
        }
        if (0.8 <= rating && rating <= 1) {
            return "Overwhelmingly Positive"
        } else if (0.6 <= rating && rating < 0.8) {
            return "Mostly Positive"
        } else if (0.4 <= rating && rating < 0.6) {
            return "Mixed"
        } else if (0.2 <= rating && rating < 0.4) {
            return "Mostly Negative"
        } else {
            return "Negative"
        }
    }

    reviewPercentage() {
        return (this.game.thumbUp + this.game.thumbDown) ? 
        this.round(this.game.thumbUp * 100 / (this.game.thumbUp + this.game.thumbDown)) : "N/A"
    }

    render() {
        let hasShortComment = false;
        const {cookies} = this.props;
        for (let i = 0; i < this.game.shortComments.length; i++){
            if (this.game.shortComments[i].commenter === cookies.cookies.username)
                hasShortComment = true;}
        const settings = {
            customPaging: (i) => {
                return (
                    <div>
                        <img className={'DotsPreviewImage'} src={this.state.imgs[i]} alt={"CoverImage"}/>
                    </div>
                );
            },
            dots: true,
            infinite: true,
            speed: 500,
            dotsClass: "slick-dots slick-thumb",
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            fade: true,
            arrows: false
        };

        const backgroundPictureStyle = {
            backgroundImage: "url(" + this.game.gamePictures[0] + ")"
        }

        if (cookies.cookies.type === 'user') {
            return (
                <div>
                    <div id={"GamePage"}>
                        <div id={"GameOverviewBlockBackground"} style={backgroundPictureStyle}>
                            <div id={"GameOverviewBlock"}>
                                <h2 id={"GameName"}>{this.game.gameName}</h2>
                                <div id={"SliderBlock"}>
                                    <Slider {...settings}>
                                        {
                                            this.state.imgs.map(img => (
                                                <div key={uid(img)}>
                                                    <img id={"GameImage"} src={img} alt={"Game Images"}/>
                                                </div>
                                            ))
                                        }
                                    </Slider>
                                </div>
                                <div id={"GameInfo"}>
                                    <div id={"GameDescription"}>
                                        <Typography variant={'h6'}>
                                            {this.game.introductionText}
                                        </Typography>
                                    </div>
                                    <div id={"GameReviewsButtons"}>
                                        <Button
                                            onClick={this.handleThumbUp.bind(this, this.game, cookies.cookies.username)}
                                            color="secondary"
                                            variant="contained"
                                            aria-label="like"
                                            startIcon={<LikeIcon/>}
                                        > My Type! {this.game.thumbUp}
                                        </Button>
                                        <Button
                                            onClick={this.handleThumbDown.bind(this, this.game, cookies.cookies.username)}
                                            aria-label="dislike"
                                            variant="contained"
                                            startIcon={<DislikeIcon/>}
                                        > Hmm, Nope {this.game.thumbDown}
                                        </Button>
                                    </div>
                                    <div id={"GameReviewsBlock"}>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>Reviews:</div>
                                            <div className={"GameReviewPersentage"}>{this.reviewTier()}</div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>Reviews in Persentage:</div>
                                            <div className={"GameReviewPersentage"}>
                                                {this.reviewPercentage()}%
                                            </div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>
                                                <p>Release date: {new Date(this.game.releaseDate).toDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>Developer:</div>
                                            <div className={"GameCompany"}>{this.game.developer}</div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>Publisher:</div>
                                            <div className={"GameCompany"}>{this.game.publisher}</div>
                                        </div>
                                        <div>
                                            <p className={"bestShortCommentContent"}>
                                                "{this.state.bestShort.commentBody}"
                                            </p>
                                            <p className={"bestShortCommentCommenter"}>
                                                &mdash;{this.state.bestShort.commenter}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id={"ReviewBar"}>
                            {
                                this.game.longComments.map(longComment => (
                                    <ExpansionPanel key={uid(longComment)} className={"ExpansionPanel"}>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            className={"ExpansionPanel"}
                                        >
                                            <div className={"expansion"}> </div>
                                            <p className={"longCommentTitle"}>
                                                {longComment.title}
                                            </p>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <div className={"LongCommentContent"}>
                                                {
                                                    longComment.commentBody.map(i => (
                                                        <p key={uid(i)}>{i}</p>))
                                                }
                                                <p>By {longComment.commenter}</p>
                                                <div className={"LikeButtons"}>
                                                    <Button
                                                        onClick={this.handleThumbUp.bind(this, longComment, cookies.cookies.username)}
                                                        color="primary"
                                                        aria-label="like"
                                                        startIcon={<LikeIcon/>}
                                                    > Agree {longComment.thumbUp}
                                                    </Button>
                                                    <Button
                                                        onClick={this.handleThumbDown.bind(this, longComment, cookies.cookies.username)}
                                                        aria-label="dislike"
                                                        startIcon={<DislikeIcon/>}
                                                    > Hmm, Nope {longComment.thumbDown}
                                                    </Button>
                                                    <Button
                                                        onClick={this.handleFunny.bind(this, longComment, cookies.cookies.username)}
                                                        color="secondary"
                                                        aria-label="funny"
                                                        startIcon={<FunnyIcon/>}
                                                    > Funny! {longComment.funny}
                                                    </Button>
                                                </div>
                                            </div>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                ))
                            }
                            <div className={"CommentBar"}>
                                <Card className={"ExistingComments"}>
                                    <div className={"ShortCommentList"}>
                                        <List>
                                            {
                                                this.game.shortComments.map(shortComment => {
                                                    return <div key={uid(shortComment)}>
                                                        <ShortComment
                                                            username={shortComment.commenter}
                                                            commentBody={shortComment.commentBody}/>
                                                        <div className={"LikeButtons"}>
                                                            <Button
                                                                onClick={this.handleThumbUp.bind(this, shortComment, cookies.cookies.username)}
                                                                color="primary"
                                                                aria-label="like"
                                                                startIcon={<LikeIcon/>}
                                                            > Agree {shortComment.thumbUp}
                                                            </Button>
                                                            <Button
                                                                onClick={this.handleThumbDown.bind(this, shortComment, cookies.cookies.username)}
                                                                aria-label="dislike"
                                                                startIcon={<DislikeIcon/>}
                                                            > Hmm, Nope {shortComment.thumbDown}
                                                            </Button>
                                                            <Button
                                                                onClick={this.handleFunny.bind(this, shortComment, cookies.cookies.username)}
                                                                color="secondary"
                                                                aria-label="funny"
                                                                startIcon={<FunnyIcon/>}
                                                            > Funny! {shortComment.funny}
                                                            </Button>
                                                        </div>
                                                        <Divider/>
                                                    </div>
                                                })
                                            }
                                        </List>
                                    </div>
                                </Card>
                                <Card className={"NewCommentCard"}>
                                    <div className={"NewCommentContainer"}>
                                        <p className={"YourCommentText"}>
                                            {hasShortComment ?
                                                "You Can Edit Your Comment Here" : "Leave Your Comment Here:"}
                                        </p>
                                        <TextField
                                            label={hasShortComment ?
                                                 "Edit original Comment here..." : "You Comment Here..."}
                                            fullWidth
                                            multiline
                                            rowsMax="50"
                                            rows={8}
                                            onChange={this.handleTypeShortComment.bind(this)}
                                            variant="filled"
                                        />
                                        <div className={"SpaceBetweenCommentAndSubmit"}>

                                        </div>
                                        <Button
                                            className={"SubmitShortCommentButton"}
                                            variant={"outlined"}
                                            color={"secondary"}
                                            startIcon={<EmotionIcon/>}
                                            onClick={()=>{hasShortComment ?
                                                this.handleEditShortComment.bind(this)(cookies.cookies.username):
                                                this.handleAddShortComment.bind(this)(cookies.cookies.username)
                                            }}>
                                            Submit
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else if (cookies.cookies.type === 'superuser') {
            return (
                <div>
                    <div id={"GamePage"}>
                        <div id={"GameOverviewBlockBackground"} style={backgroundPictureStyle}>
                            <div id={"GameOverviewBlock"}>
                                <h2 id={"GameName"}>{this.game.gameName}</h2>
                                <div id={"SliderBlock"}>
                                    <Slider {...settings}>
                                        {
                                            this.state.imgs.map(img => (
                                                <div key={uid(img)}>
                                                    <img id={"GameImage"} src={img} alt={"Game Images"}/>
                                                </div>
                                            ))
                                        }
                                    </Slider>
                                </div>
                                <div id={"GameInfo"}>
                                    <div id={"GameDescription"}>
                                        <Typography variant={'h6'}>
                                            {this.game.introductionText}
                                        </Typography>
                                    </div>
                                    <div id={"GameReviewsButtons"}>
                                        <Button
                                            onClick={this.handleThumbUp.bind(this, this.game, cookies.cookies.username)}
                                            color="secondary"
                                            variant="contained"
                                            aria-label="like"
                                            startIcon={<LikeIcon/>}
                                        > My Type! {this.game.thumbUp}
                                        </Button>
                                        <Button
                                            onClick={this.handleThumbDown.bind(this, this.game, cookies.cookies.username)}
                                            aria-label="dislike"
                                            variant="contained"
                                            startIcon={<DislikeIcon/>}
                                        > Hmm, Nope {this.game.thumbDown}
                                        </Button>
                                    </div>
                                    <div id={"GameReviewsBlock"}>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>Reviews:</div>
                                            <div className={"GameReviewPersentage"}>{this.reviewTier()}</div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>Reviews in Persentage:</div>
                                            <div className={"GameReviewPersentage"}>{this.reviewPercentage()}%</div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>
                                                <p>Release date: {new Date(this.game.releaseDate).toDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>Developer:</div>
                                            <div className={"GameCompany"}>{this.game.developer}</div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>Publisher:</div>
                                            <div className={"GameCompany"}>{this.game.publisher}</div>
                                        </div>
                                        <div>
                                            <p className={"bestShortCommentContent"}>
                                                "{this.state.bestShort.commentBody}"
                                            </p>
                                            <div className={"bestShortCommentCommenter"}>
                                                &mdash;{this.state.bestShort.commenter}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id={"ReviewBar"}>
                            {
                                this.game.longComments.map(longComment => (
                                    <ExpansionPanel key={uid(longComment)}>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <div className={"expansion"}> </div>
                                            <p className={"longCommentTitle"}>
                                                {longComment.title}
                                            </p>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <div>
                                                {
                                                    longComment.commentBody.map(i => (
                                                        <p className={"LongCommentContent"} key={uid(i)}>{i}</p>))
                                                }
                                                <p className={"LongCommentContent"}>By {longComment.commenter}, {new Date(longComment.time).toDateString()}</p>
                                                <div className={"LikeButtons"}>
                                                    <Button
                                                        onClick={this.handleThumbUp.bind(this, longComment, cookies.cookies.username)}
                                                        color="primary"
                                                        aria-label="like"
                                                        startIcon={<LikeIcon/>}
                                                    > Agree {longComment.thumbUp}
                                                    </Button>
                                                    <Button
                                                        onClick={this.handleThumbDown.bind(this, longComment, cookies.cookies.username)}
                                                        aria-label="dislike"
                                                        startIcon={<DislikeIcon/>}
                                                    > Hmm, Nope {longComment.thumbDown}
                                                    </Button>
                                                    <Button
                                                        onClick={this.handleFunny.bind(this, longComment, cookies.cookies.username)}
                                                        color="secondary"
                                                        aria-label="funny"
                                                        startIcon={<FunnyIcon/>}
                                                    > Funny! {longComment.funny}
                                                    </Button>
                                                </div>
                                            </div>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                ))
                            }
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <div className={"expansion"}> </div>
                                    <p className={"longCommentRequest"}>
                                        <WriteIcon/>&emsp;Want to share your review?
                                    </p>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <FormControl fullWidth autoComplete="off">
                                        <TextField
                                            id="filled-multiline-static"
                                            label="title"
                                            rows={1}
                                            onChange={this.handleLongCommentTitleChange.bind(this)}
                                            fullWidth
                                            placeholder="Write your title here"
                                            variant="filled"
                                            helperText="Be polite~"
                                        />
                                        <TextField
                                            id="filled-multiline-static"
                                            label="Need to be no less than 500 characters."
                                            multiline
                                            rows={25}
                                            onChange={this.handleLongCommentContentChange.bind(this)}
                                            fullWidth
                                            placeholder="Write your long review here"
                                            variant="filled"
                                            helperText="Thank you for sharing your voice with everyone!"
                                        />
                                        <div id={"longCommentSubmissionButton"}>
                                            <Button
                                                height={"10px"}
                                                onClick={this.handleAddLongComment.bind(this,
                                                    cookies.cookies.username)}
                                                color="secondary"
                                                variant={"outlined"}
                                                aria-label="longCommentSubmission"
                                                startIcon={<EmotionIcon/>}
                                            > Submit!
                                            </Button>
                                        </div>
                                    </FormControl>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <div className={"CommentBar"}>
                                <Card className={"ExistingComments"}>
                                    <div className={"ShortCommentList"}>
                                        <List>
                                            {
                                                this.game.shortComments.map(shortComment =>
                                                {return <div key={uid(shortComment)}>
                                                    <ShortComment
                                                        username={shortComment.commenter}
                                                        commentBody={shortComment.commentBody}/>
                                                    <div className={"LikeButtons"}>
                                                        <Button
                                                            onClick={this.handleThumbUp.bind(this, shortComment, cookies.cookies.username)}
                                                            color="primary"
                                                            aria-label="like"
                                                            startIcon={<LikeIcon/>}
                                                        > Agree {shortComment.thumbUp}
                                                        </Button>
                                                        <Button
                                                            onClick={this.handleThumbDown.bind(this, shortComment, cookies.cookies.username)}
                                                            aria-label="dislike"
                                                            startIcon={<DislikeIcon/>}
                                                        > Hmm, Nope {shortComment.thumbDown}
                                                        </Button>
                                                        <Button
                                                            onClick={this.handleFunny.bind(this, shortComment, cookies.cookies.username)}
                                                            color="secondary"
                                                            aria-label="funny"
                                                            startIcon={<FunnyIcon/>}
                                                        > Funny! {shortComment.funny}
                                                        </Button>
                                                    </div>
                                                    <Divider/>
                                                </div>
                                                })
                                            }
                                        </List>
                                    </div>
                                </Card>
                                <Card className={"NewCommentCard"}>
                                    <div className={"NewCommentContainer"}>
                                        <p className={"YourCommentText"}>
                                            {hasShortComment ?
                                                "You Can Edit Your From Comment Here" : "Leave Your Comment Here:"}
                                        </p>
                                        <TextField
                                            label={hasShortComment ?
                                                "Edit original Comment here..." : "You Comment Here..."}
                                            fullWidth
                                            multiline
                                            rowsMax="50"
                                            rows={8}
                                            onChange={this.handleTypeShortComment.bind(this)}
                                            variant="filled"
                                        />
                                        <div className={"SpaceBetweenCommentAndSubmit"}>

                                        </div>
                                        <Button
                                            className={"SubmitShortCommentButton"}
                                            variant={"outlined"}
                                            color={"secondary"}
                                            startIcon={<EmotionIcon/>}
                                            onClick={()=>{hasShortComment ?
                                                this.handleEditShortComment.bind(this)(cookies.cookies.username):
                                                this.handleAddShortComment.bind(this)(cookies.cookies.username)
                                            }}>
                                            Submit
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else if (cookies.cookies.type === 'admin') {
            return (
                <div>
                    <div id={"GamePage"}>
                        <div id={"GameOverviewBlockBackground"} style={backgroundPictureStyle}>
                            <div id={"GameOverviewBlock"}>
                                <h2 id={"GameName"}>{this.game.gameName}</h2>
                                <div id={"SliderBlock"}>
                                    <Slider {...settings}>
                                        {
                                            this.state.imgs.map(img => (
                                                <div key={uid(img)}>
                                                    <img id={"GameImage"} src={img} alt={"Game Images"}/>
                                                </div>
                                            ))
                                        }
                                    </Slider>
                                </div>
                                <div id={"GameInfo"}>
                                    <div id={"GameDescription"}>
                                        <Typography variant={'h6'}>
                                            {this.game.introductionText}
                                        </Typography>
                                    </div>
                                    <div id={"GameReviewsButtons"}>
                                        <Button
                                            disabled
                                            onClick={this.handleThumbUp.bind(this, this.game, cookies.cookies.username)}
                                            color="secondary"
                                            variant="contained"
                                            aria-label="like"
                                            startIcon={<LikeIcon/>}
                                        > My Type! {this.game.thumbUp}
                                        </Button>
                                        <Button
                                            disabled
                                            onClick={this.handleThumbDown.bind(this, this.game, cookies.cookies.username)}
                                            aria-label="dislike"
                                            variant="contained"
                                            startIcon={<DislikeIcon/>}
                                        > Hmm, Nope {this.game.thumbDown}
                                        </Button>
                                    </div>
                                    <div id={"GameReviewsBlock"}>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>Reviews:</div>
                                            <div className={"GameReviewPersentage"}>{this.reviewTier()}</div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>Reviews in Persentage:</div>
                                            <div className={"GameReviewPersentage"}>{this.reviewPercentage()}%</div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>
                                                <p>Release date: {new Date(this.game.releaseDate).toDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>Developer:</div>
                                            <div className={"GameCompany"}>{this.game.developer}</div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>Publisher:</div>
                                            <div className={"GameCompany"}>{this.game.publisher}</div>
                                        </div>
                                        <div>
                                            <p className={"bestShortCommentContent"}>
                                                "{this.state.bestShort.commentBody}"
                                            </p>
                                            <p className={"bestShortCommentCommenter"}>
                                                &mdash;{this.state.bestShort.commenter}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id={"ReviewBar"}>
                            {
                                this.game.longComments.map(longComment => (
                                    <ExpansionPanel key={uid(longComment)}>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <div className={"expansion"}> </div>
                                            <p className={"longCommentTitle"}>
                                                {longComment.title}
                                            </p>
                                            <Button
                                                onClick={this.handleLongCommentDelete.bind(this, longComment)}
                                                aria-label="delete"
                                                startIcon={<DeleteIcon/>}> Delete
                                            </Button>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <div className={"LongCommentContent"}>
                                                {
                                                    longComment.commentBody.map(i => (
                                                        <p key={uid(i)}>{i}</p>
                                                    ))
                                                }
                                                <p>By {longComment.commenter}, {longComment.time}</p>
                                                <div className={"LikeButtons"}>
                                                    <Button
                                                        disabled
                                                        onClick={this.handleThumbUp.bind(this, longComment, cookies.cookies.username)}
                                                        color="primary"
                                                        aria-label="like"
                                                        startIcon={<LikeIcon/>}
                                                    > Agree {longComment.thumbUp}
                                                    </Button>
                                                    <Button
                                                        disabled
                                                        onClick={this.handleThumbDown.bind(this, longComment, cookies.cookies.username)}
                                                        aria-label="dislike"
                                                        startIcon={<DislikeIcon/>}
                                                    > Hmm, Nope {longComment.thumbDown}
                                                    </Button>
                                                    <Button
                                                        disabled
                                                        onClick={this.handleFunny.bind(this, longComment, cookies.cookies.username)}
                                                        color="secondary"
                                                        aria-label="funny"
                                                        startIcon={<FunnyIcon/>}
                                                    > Funny! {longComment.funny}
                                                    </Button>
                                                </div>
                                            </div>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                ))
                            }
                            <div className={"CommentBar"}>
                                <Card className={"adminExistingComments"}>
                                    <div className={"ShortCommentList"}>
                                        <List>
                                            {
                                                this.game.shortComments.map(shortComment =>
                                                {return <div key={uid(shortComment)}>
                                                    <ShortComment
                                                        username={shortComment.commenter}
                                                        commentBody={shortComment.commentBody}/>
                                                    <div className={"LikeButtons"}>
                                                        <Button
                                                            disabled
                                                            onClick={this.handleThumbUp.bind(this, shortComment, cookies.cookies.username)}
                                                            color="primary"
                                                            aria-label="like"
                                                            startIcon={<LikeIcon/>}
                                                        > Agree {shortComment.thumbUp}
                                                        </Button>
                                                        <Button
                                                            disabled
                                                            onClick={this.handleThumbDown.bind(this, shortComment, cookies.cookies.username)}
                                                            aria-label="dislike"
                                                            startIcon={<DislikeIcon/>}
                                                        > Hmm, Nope {shortComment.thumbDown}
                                                        </Button>
                                                        <Button
                                                            disabled
                                                            onClick={this.handleFunny.bind(this, shortComment, cookies.cookies.username)}
                                                            color="secondary"
                                                            aria-label="funny"
                                                            startIcon={<FunnyIcon/>}
                                                        > Funny! {shortComment.funny}
                                                        </Button>
                                                    </div>
                                                    <Button
                                                        onClick={this.handleShortCommentDelete.bind(this, shortComment)}
                                                        aria-label="delete"
                                                        startIcon={<DeleteIcon/>}> Delete
                                                    </Button>
                                                    <Divider/>
                                                </div>
                                                })
                                            }
                                        </List>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div id={"GamePage"}>
                        <div id={"GameOverviewBlockBackground"} style={backgroundPictureStyle}>
                            <div id={"GameOverviewBlock"}>
                                <h2 id={"GameName"}>{this.game.gameName}</h2>
                                <div id={"SliderBlock"}>
                                    <Slider {...settings}>
                                        {
                                            this.state.imgs.map(img => (
                                                <div key={uid(img)}>
                                                    <img id={"GameImage"} src={img} alt={"Game Images"}/>
                                                </div>
                                            ))
                                        }
                                    </Slider>
                                </div>
                                <div id={"GameInfo"}>
                                    <div id={"GameDescription"}>
                                        <Typography variant={'h6'}>
                                            {this.game.introductionText}
                                        </Typography>
                                    </div>
                                    <div id={"GameReviewsButtons"}>
                                        <Button
                                            disabled
                                            onClick={this.handleThumbUp.bind(this, this.game, cookies.cookies.username)}
                                            color="secondary"
                                            variant="contained"
                                            aria-label="like"
                                            startIcon={<LikeIcon/>}
                                        > My Type! {this.game.thumbUp}
                                        </Button>
                                        <Button
                                            disabled
                                            onClick={this.handleThumbDown.bind(this, this.game, cookies.cookies.username)}
                                            aria-label="dislike"
                                            variant="contained"
                                            startIcon={<DislikeIcon/>}
                                        > Hmm, Nope {this.game.thumbDown}
                                        </Button>
                                    </div>
                                    <div id={"GameReviewsBlock"}>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>Reviews:</div>
                                            <div className={"GameReviewPersentage"}>{this.reviewTier()}</div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>Reviews Data:</div>
                                            <div className={"GameReviewPersentage"}>{this.reviewPercentage()}%</div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>
                                                <p>Release date: {new Date(this.game.releaseDate).toDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>Developer:</div>
                                            <div className={"GameCompany"}>{this.game.developer}</div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>Publisher:</div>
                                            <div className={"GameCompany"}>{this.game.publisher}</div>
                                        </div>
                                        <div>
                                            <p className={"bestShortCommentContent"}>
                                                "{this.state.bestShort.commentBody}"
                                            </p>
                                            <p className={"bestShortCommentCommenter"}>
                                                &mdash;{this.state.bestShort.commenter}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id={"ReviewBar"}>
                            {
                                this.game.longComments.map(longComment => (
                                    <ExpansionPanel key={uid(longComment)}>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <div className={"expansion"}> </div>
                                            <p className={"longCommentTitle"}>
                                                {longComment.title}
                                            </p>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <div className={"LongCommentContent"}>
                                                {
                                                    longComment.commentBody.map(i => (
                                                        <p key={uid(i)}>{i}</p>))
                                                }
                                                <p>By {longComment.commenter}, {longComment.time}</p>
                                                <div className={"LikeButtons"}>
                                                    <Button
                                                        disabled
                                                        onClick={this.handleThumbUp.bind(this, longComment, cookies.cookies.username)}
                                                        color="primary"
                                                        aria-label="like"
                                                        startIcon={<LikeIcon/>}
                                                    > Agree {longComment.thumbUp}
                                                    </Button>
                                                    <Button
                                                        disabled
                                                        onClick={this.handleThumbDown.bind(this, longComment, cookies.cookies.username)}
                                                        aria-label="dislike"
                                                        startIcon={<DislikeIcon/>}
                                                    > Hmm, Nope {longComment.thumbDown}
                                                    </Button>
                                                    <Button
                                                        disabled
                                                        onClick={this.handleFunny.bind(this, longComment, cookies.cookies.username)}
                                                        color="secondary"
                                                        aria-label="funny"
                                                        startIcon={<FunnyIcon/>}
                                                    > Funny! {longComment.funny}
                                                    </Button>
                                                </div>
                                            </div>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                ))
                            }
                            <div className={"CommentBar"}>
                                <Card className={"ExistingComments"}>
                                    <div className={"ShortCommentList"}>
                                        <List>
                                            {
                                                this.game.shortComments.map(shortComment =>
                                                {return <div key={uid(shortComment)}>
                                                    <ShortComment
                                                        username={shortComment.commenter}
                                                        commentBody={shortComment.commentBody}/>
                                                    <div className={"LikeButtons"}>
                                                        <Button
                                                            disabled
                                                            onClick={this.handleThumbUp.bind(this, shortComment, cookies.cookies.username)}
                                                            color="primary"
                                                            aria-label="like"
                                                            startIcon={<LikeIcon/>}
                                                        > Agree {shortComment.thumbUp}
                                                        </Button>
                                                        <Button
                                                            disabled
                                                            onClick={this.handleThumbDown.bind(this, shortComment, cookies.cookies.username)}
                                                            aria-label="dislike"
                                                            startIcon={<DislikeIcon/>}
                                                        > Hmm, Nope {shortComment.thumbDown}
                                                        </Button>
                                                        <Button
                                                            disabled
                                                            onClick={this.handleFunny.bind(this, shortComment, cookies.cookies.username)}
                                                            color="secondary"
                                                            aria-label="funny"
                                                            startIcon={<FunnyIcon/>}
                                                        > Funny! {shortComment.funny}
                                                        </Button>
                                                    </div>
                                                    <Divider/>
                                                </div>
                                                })
                                            }
                                        </List>
                                    </div>
                                </Card>
                                <Card className={"NewCommentCard"}>
                                    <div className={"NewCommentContainer"}>
                                        <p className={"YourCommentText"}>
                                            Sign in as User / Superuser so you can share your opinion!
                                        </p>
                                        <TextField
                                            label="Sign in as User/Superuser to leave a comment here."
                                            fullWidth
                                            multiline
                                            rowsMax="50"
                                            rows={8}
                                            onChange={this.handleTypeShortComment.bind(this)}
                                            variant="filled"
                                            disabled
                                        />
                                        <div className={"SpaceBetweenCommentAndSubmit"}>

                                        </div>
                                        <Button
                                            className={"SubmitShortCommentButton"}
                                            variant={"outlined"}
                                            color={"primary"}
                                            disabled
                                            startIcon={<EmotionIcon/>}
                                            onClick={()=>{this.handleAddShortComment.bind(this)(cookies.cookies.username)}}>
                                            Submit
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default withCookies(GamePageOverview);

