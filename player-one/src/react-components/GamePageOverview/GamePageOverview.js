import React, {Component} from "react";
import Slider from "react-slick";
import './styles.css'
import { withCookies } from "react-cookie";
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

const l = console.log;

class GamePageOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgs: [
                game0, game1, game2, game3
            ]
        };
        this.game = game;
    }
    handleLike(longComment) {
        longComment.likeNum += 1;
        this.forceUpdate();}
    handleDislike(longComment) {
        longComment.dislikeNum += 1;
        this.forceUpdate();
    }
    handleFunny(longComment) {
        longComment.funnyNum += 1;
        this.forceUpdate();
    }

    render() {
        const {cookies} = this.props;
        l(cookies.cookies.type);
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
        if (cookies.cookies.type === 'user'){
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
                                                <p>Realease date: {this.game.releaseDate}
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
                                            <div className={"expansion"}></div>
                                            <strong className={"longCommentTitle"}>
                                                {longComment.title}
                                            </strong>
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
                                                <p>Realease date: {this.game.releaseDate}
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
                                    <TextField
                                        id="filled-multiline-static"
                                        label="Need to be no shorter than 1000 characters."
                                        multiline
                                        fullWidth
                                        fullHeight
                                        placeholder="Write your long reivew here"
                                        variant="filled"
                                        helperText="Need to be no shorter than 1000 characters."
                                    />
                                    <div id={"longCommentSubmissionButton"}>
                                        <Button
                                            height={"10px"}
                                            // onClick={this.handlelongCommentSubmission.bind(this, longComment)}
                                            color="secondary"
                                            aria-label="longCommentSubmission"
                                            startIcon={<FunnyIcon/>}
                                        > Submit!
                                        </Button>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
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
                                                <p>Realease date: {this.game.releaseDate}
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
                                            <strong className={"longCommentTitle"}>
                                                {longComment.title}
                                            </strong>
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

                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default withCookies(GamePageOverview);

