import React, {Component} from "react";
import Slider from "react-slick";
import './styles.css'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DislikeIcon from '@material-ui/icons/ThumbDown';
import LikeIcon from '@material-ui/icons/ThumbUp';
import RealGamerIcon from '@material-ui/icons/VideogameAsset';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
// import OutlinedButtons from './Buttons'
import longComment1 from "./longComment1"
import longComment2 from "./longComment2"
import game0 from '../../imgs/the_witcher_3_wild_hunt/image0.jpg'
import game1 from '../../imgs/the_witcher_3_wild_hunt/image1.jpg'
import game2 from '../../imgs/the_witcher_3_wild_hunt/image2.jpg'
import game3 from '../../imgs/the_witcher_3_wild_hunt/image3.jpg'

const l = console.log;

export default class GamePageOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameDescription: "The Witcher: Wild Hunt is a story-driven open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.",
            longComment1: longComment1,
            longComment2: longComment2,
            imgs: [
                game0, game1, game2, game3
            ]
        };
    }

    handleLike(e) {
        e.preventDefault();
        let comm;
        if (e.target.parentNode.parentNode.parentNode.id === 'LongCommentContent1') {
            comm = this.state.longComment1;
            this.setState({longComment1: { ...comm, likeNum: comm.likeNum + 1}});
        }
        else {
            comm = this.state.longComment2;
            this.setState({longComment2: { ...comm, likeNum: comm.likeNum + 1}});}
    }

    handleDislike(e) {
        e.preventDefault();
        let comm;
        if (e.target.parentNode.parentNode.parentNode.id === 'LongCommentContent1') {
            comm = this.state.longComment1;
            this.setState({longComment1: { ...comm, dislikeNum: comm.dislikeNum + 1}});
        }
        else {
            comm = this.state.longComment2;
            this.setState({longComment2: { ...comm, dislikeNum: comm.dislikeNum + 1}});}
    }

    handleRealGamer(e) {
        e.preventDefault();
        let comm;
        if (e.target.parentNode.parentNode.parentNode.id === 'LongCommentContent1') {
            comm = this.state.longComment1;
            this.setState({longComment1: { ...comm, realGamerNum: comm.realGamerNum + 1}});
        }
        else {
            comm = this.state.longComment2;
            this.setState({longComment2: { ...comm, realGamerNum: comm.realGamerNum + 1}});}
    }

    render() {
        const settings = {
            customPaging: (i) => {
                return (
                    <div>
                        <img className={'DotsPreviewImage'}  src={this.state.imgs[i]} alt={"CoverImage"}/>
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
        return (
            <div>
                <div id={"GamePage"}>
                    <div id={"GameOverviewBlockBackground"}>
                        <div id={"GameOverviewBlock"}>
                            <h2 id={"GameName"}> The Witcher 3&reg;	: Wild Hunt</h2>
                            <div id={"SliderBlock"}>
                                <Slider {...settings}>
                                    {
                                        this.state.imgs.map(img => (
                                            <div key={img}>
                                                <img id={"GameImage"} src={img} alt={"Game Images"}/>
                                            </div>
                                        ))
                                    }
                                </Slider>
                            </div>
                            <div id={"GameInfo"}>
                                <div id={"GameDescription"}>
                                    <Typography variant={'h6'}>
                                        {this.state.gameDescription}
                                    </Typography>
                                </div>
                                <div id={"GameReviewsBlock"}>
                                    <div className={"GameReviewsRow"}>
                                        <div className={"GameReviews"}>Recent Reviews:</div>
                                        <div className={"GameReviewPersentage"}> Overwhelmingly Positive (99%)</div>
                                    </div>
                                    <div className={"GameReviewsRow"}>
                                        <div className={"GameReviews"}>All Reviews:</div>
                                        <div className={"GameReviewPersentage"}> Overwhelmingly Positive (96%)</div>
                                    </div>
                                    <div className={"GameReviewsRow"}>
                                        <div className={"GameReviews"}><p>Realease date: 18 May, 2015</p></div>
                                    </div>
                                    <div className={"GameReviewsRow"}>
                                        <div className={"GameReviews"}>Developer:</div>
                                        <div className={"GameCompany"}>CD PROJEKT RED</div>
                                    </div>
                                    <div className={"GameReviewsRow"}>
                                        <div className={"GameReviews"}>Release:</div>
                                        <div className={"GameCompany"}>CD PROJEKT RED</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id={"ReviewBar"}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant={"h5"}><strong>

                                    {this.state.longComment1.title}
                                </strong></Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div id={"LongCommentContent1"}>
                                    {
                                        this.state.longComment1.content.map(i=>(<p key={i} className={"LongCommentContent"}>{i}</p>))
                                    }
                                    <div className={"LikeButtons"}>
                                        <Button
                                            onClick={this.handleLike.bind(this)}
                                            color="primary"
                                            aria-label="like"
                                            startIcon={<LikeIcon />}
                                        > Agree  {this.state.longComment1.likeNum}
                                        </Button>
                                        <Button
                                            onClick={this.handleDislike.bind(this)}
                                            aria-label="dislike"
                                            startIcon={<DislikeIcon />}
                                        > Hmm, Nope  {this.state.longComment1.dislikeNum}
                                        </Button>
                                        <Button
                                            onClick={this.handleRealGamer.bind(this)}
                                            color="secondary"
                                            aria-label="gamer"
                                            startIcon={<RealGamerIcon />}
                                        > Funny!  {this.state.longComment1.realGamerNum}
                                        </Button>
                                    </div>
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant={"h5"}><strong>
                                    {this.state.longComment2.title}
                                </strong></Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div id={"LongCommentContent2"}>
                                    {
                                        this.state.longComment2.content.map(i=>(<p key={i} className={"LongCommentContent"}>{i}</p>))
                                    }
                                    <div className={"LongCommentContent"}>
                                        <div className={"LikeButtons"}>
                                            <Button
                                                onClick={this.handleLike.bind(this)}
                                                color="primary"
                                                aria-label="like"
                                                startIcon={<LikeIcon />}
                                            > Agree  {this.state.longComment2.likeNum}
                                            </Button>
                                            <Button
                                                onClick={this.handleDislike.bind(this)}
                                                aria-label="dislike"
                                                startIcon={<DislikeIcon />}
                                            > Hmm, Nope  {this.state.longComment2.dislikeNum}
                                            </Button>
                                            <Button
                                                onClick={this.handleRealGamer.bind(this)}
                                                color="secondary"
                                                aria-label="gamer"
                                                startIcon={<RealGamerIcon />}
                                            > Funny!  {this.state.longComment2.realGamerNum}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                </div>
            </div>
        );
    }

}
