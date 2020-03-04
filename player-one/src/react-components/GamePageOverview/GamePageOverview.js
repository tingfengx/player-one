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
import FunnyIcon from '@material-ui/icons/VideogameAsset';
import Button from '@material-ui/core/Button'
import game from "./the_withcher_3_wild_hunt"
import game0 from '../../imgs/the_witcher_3_wild_hunt/image0.jpg';
import game1 from '../../imgs/the_witcher_3_wild_hunt/image1.jpg';
import game2 from '../../imgs/the_witcher_3_wild_hunt/image2.jpg';
import game3 from '../../imgs/the_witcher_3_wild_hunt/image3.jpg';
import {uid} from 'react-uid'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import {Card, List} from "@material-ui/core";
import ShortComment from '../ShortComment'

const l = console.log;

let bestShort = {};
for (let i = 0; i < game.shortComments.length; i++){
    if (game.shortComments[i].best)
        bestShort = game.shortComments[i];
}

class GamePageOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgs: [
                game0, game1, game2, game3
            ],
            longCommentContent: '',
            longCommentTitle: '',
            shortCommentContent: '',
            bestShort: bestShort
        };
        this.game = game;
    }

    handleLike(longComment) {
        longComment.likeNum += 1;
        this.forceUpdate();
    }

    handleDislike(longComment) {
        longComment.dislikeNum += 1;
        this.forceUpdate();
    }

    handleFunny(longComment) {
        longComment.funnyNum += 1;
        this.forceUpdate();
    }

    handleTypeShortComment(event) {
        event.preventDefault();
        this.setState({shortCommentContent: event.target.value});
        // l(this.state.shortCommentContent)
    }

    handleAddShortComment(username) {
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
            "username": username,
            "commentText": this.state.shortCommentContent});
        l(this.game.shortComments);
        this.forceUpdate();
    }

    handleLongCommentSubmission(username) {
        for (let i = 0; i < this.game.longComments.length; i++) {
            if (this.game.longComments[i].author === username) {
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
                content: this.state.longCommentContent.split(/\r?\n/),
                liked: false,
                disliked: false,
                realGamer: false,
                likeNum: 0,
                dislikeNum: 0,
                funnyNum: 0,
                author: username
            };
            l(this.game.longComments.content);
            this.game.longComments.push(newLongComment);
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

    render() {
        const {cookies} = this.props;
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
        if (cookies.cookies.type === 'user') {
            return (
                <div>
                    <div id={"GamePage"}>
                        <div id={"GameOverviewBlockBackground"}>
                            <div id={"GameOverviewBlock"}>
                                <h2 id={"GameName"}> The Witcher 3&reg;    : Wild Hunt</h2>
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
                                            {this.game.description}
                                        </Typography>
                                    </div>
                                    <div id={"GameReviewsBlock"}>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>Recent Reviews:</div>
                                            <div className={"GameReviewPersentage"}>{this.game.recentReview}</div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>All Reviews:</div>
                                            <div className={"GameReviewPersentage"}>{this.game.allReview}</div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>
                                                <p>Release date: {this.game.releaseDate}
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
                                                "{this.state.bestShort.commentText}"
                                            </p>
                                            <p className={"bestShortCommentAuthor"}>
                                                &mdash;{this.state.bestShort.username}
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
                                                    longComment.content.map(i => (
                                                        <p key={uid(i)}>{i}</p>))
                                                }
                                                <p>By {longComment.author}</p>
                                                <div className={"LikeButtons"}>
                                                    <Button
                                                        onClick={this.handleLike.bind(this, longComment)}
                                                        color="primary"
                                                        aria-label="like"
                                                        startIcon={<LikeIcon/>}
                                                    > Agree {longComment.likeNum}
                                                    </Button>
                                                    <Button
                                                        onClick={this.handleDislike.bind(this, longComment)}
                                                        aria-label="dislike"
                                                        startIcon={<DislikeIcon/>}
                                                    > Hmm, Nope {longComment.dislikeNum}
                                                    </Button>
                                                    <Button
                                                        onClick={this.handleFunny.bind(this, longComment)}
                                                        color="secondary"
                                                        aria-label="funny"
                                                        startIcon={<FunnyIcon/>}
                                                    > Funny! {longComment.funnyNum}
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
                                                this.game.shortComments.map(i =>
                                                    (<ShortComment
                                                        key={uid(i)}
                                                        username={i.username}
                                                        commentText={i.commentText}/>))
                                            }
                                        </List>
                                    </div>
                                </Card>
                                <Card className={"NewCommentCard"}>
                                    <div className={"NewCommentContainer"}>
                                        <p className={"YourCommentText"}>
                                            Leave Your Comment Here:
                                        </p>
                                        <TextField
                                            label="You Comment Here..."
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
                                            color={"primary"}
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
        else if (cookies.cookies.type === 'superuser') {
            return (
                <div>
                    <div id={"GamePage"}>
                        <div id={"GameOverviewBlockBackground"}>
                            <div id={"GameOverviewBlock"}>
                                <h2 id={"GameName"}> The Witcher 3&reg;    : Wild Hunt</h2>
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
                                            {this.game.description}
                                        </Typography>
                                    </div>
                                    <div id={"GameReviewsBlock"}>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>Recent Reviews:</div>
                                            <div className={"GameReviewPersentage"}>{this.game.recentReview}</div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>All Reviews:</div>
                                            <div className={"GameReviewPersentage"}>{this.game.allReview}</div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>
                                                <p>Release date: {this.game.releaseDate}
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
                                                "{this.state.bestShort.commentText}"
                                            </p>
                                            <p className={"bestShortCommentAuthor"}>
                                                &mdash;{this.state.bestShort.username}
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
                                            <div>
                                                {
                                                    longComment.content.map(i => (
                                                        <p className={"LongCommentContent"} key={uid(i)}>{i}</p>))
                                                }
                                                <p className={"LongCommentContent"}>By {longComment.author}</p>
                                                <div className={"LikeButtons"}>
                                                    <Button
                                                        onClick={this.handleLike.bind(this, longComment)}
                                                        color="primary"
                                                        aria-label="like"
                                                        startIcon={<LikeIcon/>}
                                                    > Agree {longComment.likeNum}
                                                    </Button>
                                                    <Button
                                                        onClick={this.handleDislike.bind(this, longComment)}
                                                        aria-label="dislike"
                                                        startIcon={<DislikeIcon/>}
                                                    > Hmm, Nope {longComment.dislikeNum}
                                                    </Button>
                                                    <Button
                                                        onClick={this.handleFunny.bind(this, longComment)}
                                                        color="secondary"
                                                        aria-label="funny"
                                                        startIcon={<FunnyIcon/>}
                                                    > Funny! {longComment.funnyNum}
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
                                        want to share your review?
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
                                            helperText="be polite~"
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
                                                onClick={this.handleLongCommentSubmission.bind(this,
                                                    cookies.cookies.username)}
                                                color="secondary"
                                                aria-label="longCommentSubmission"
                                                startIcon={<FunnyIcon/>}
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
                                                this.game.shortComments.map(i =>
                                                    (<ShortComment
                                                        key={uid(i)}
                                                        username={i.username}
                                                        commentText={i.commentText}/>))
                                            }
                                        </List>
                                    </div>
                                </Card>
                                <Card className={"NewCommentCard"}>
                                    <div className={"NewCommentContainer"}>
                                        <p className={"YourCommentText"}>
                                            Leave Your Comment Here:
                                        </p>
                                        <TextField
                                            label="You Comment Here..."
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
                                            color={"primary"}
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
        else {
            return (
                <div>
                    <div id={"GamePage"}>
                        <div id={"GameOverviewBlockBackground"}>
                            <div id={"GameOverviewBlock"}>
                                <h2 id={"GameName"}> The Witcher 3&reg; : Wild Hunt</h2>
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
                                            {this.game.description}
                                        </Typography>
                                    </div>
                                    <div id={"GameReviewsBlock"}>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>Recent Reviews:</div>
                                            <div className={"GameReviewPersentage"}>{this.game.recentReview}</div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>All Reviews:</div>
                                            <div className={"GameReviewPersentage"}>{this.game.allReview}</div>
                                        </div>
                                        <div className={"GameReviewsRow"}>
                                            <div className={"GameReviews"}>
                                                <p>Release date: {this.game.releaseDate}
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
                                                "{this.state.bestShort.commentText}"
                                            </p>
                                            <p className={"bestShortCommentAuthor"}>
                                                &mdash;{this.state.bestShort.username}
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
                                                    longComment.content.map(i => (
                                                        <p key={uid(i)}>{i}</p>))
                                                }
                                                <p>By {longComment.author}</p>
                                                <div className={"LikeButtons"}>
                                                    <Button
                                                        onClick={this.handleLike.bind(this, longComment)}
                                                        color="primary"
                                                        aria-label="like"
                                                        startIcon={<LikeIcon/>}
                                                    > Agree {longComment.likeNum}
                                                    </Button>
                                                    <Button
                                                        onClick={this.handleDislike.bind(this, longComment)}
                                                        aria-label="dislike"
                                                        startIcon={<DislikeIcon/>}
                                                    > Hmm, Nope {longComment.dislikeNum}
                                                    </Button>
                                                    <Button
                                                        onClick={this.handleFunny.bind(this, longComment)}
                                                        color="secondary"
                                                        aria-label="funny"
                                                        startIcon={<FunnyIcon/>}
                                                    > Funny! {longComment.funnyNum}
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
                                                this.game.shortComments.map(i =>
                                                    (<ShortComment
                                                        key={uid(i)}
                                                        username={i.username}
                                                        commentText={i.commentText}/>))
                                            }
                                        </List>
                                    </div>
                                </Card>
                                <Card className={"NewCommentCard"}>
                                    <div className={"NewCommentContainer"}>
                                        <p className={"YourCommentText"}>
                                            Leave Your Comment Here:
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

