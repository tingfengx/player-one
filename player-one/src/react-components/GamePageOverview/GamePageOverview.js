import React, { Component } from "react";
import Slider from "react-slick";
import './styles.css'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import game0 from '../../imgs/the_witcher_3_wild_hunt/image0.jpg'
import game1 from '../../imgs/the_witcher_3_wild_hunt/image1.jpg'
import game2 from '../../imgs/the_witcher_3_wild_hunt/image2.jpg'
import game3 from '../../imgs/the_witcher_3_wild_hunt/image3.jpg'


export default class GamePageOverview extends Component {
    imgs = [
        game0, game1, game2, game3
    ];

    render() {
        const settings = {
            customPaging: (i) => {
                return (
                    <div>
                        <img className={'DotsPreviewImage'}  src={this.imgs[i]} alt={"CoverImage"}/>
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
                <div id={"GameOverviewBlockBackground"}>
                    <div id={"GameOverviewBlock"}>
                        {/*// style={{*/}
                        {/*//     backgroundImage: `url(${bgimgUrl})`*/}
                        {/*// }}*/}
                        <h2 id={"GameName"}> The Witcher 3: Wild Hunt</h2>
                        <div id={"SliderBlock"}>
                            <Slider {...settings}>
                                {
                                    this.imgs.map(img => (
                                        <div key={img}>
                                            <img id={"GameImage"} src={img} alt={"Game Images"}/>
                                        </div>

                                    ))
                                }
                            </Slider>
                        </div>
                        <div className={"GameInfo"}>
                            <div id={"GameDescription"}>
                                <p>The Witcher: Wild Hunt is a story-driven open world RPG set in a visually stunning fantasy
                                universe full of meaningful choices and impactful consequences. In The Witcher, you play as
                                professional monster hunter Geralt of Rivia tasked with finding a child of prophecy in a vast
                                open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten
                                    caverns to explore.</p>
                            </div>
                            <div id={"GameReviewsBlock"}>
                                <div className={"GameReviewsRow"}>
                                    <div className={"GameReviews"}><p>Recent Reviews: </p></div>
                                    <div className={"GameReviewPersentage"}><p> Overwhelmingly Positive (99%)</p></div>
                                </div>
                                <div className={"GameReviewsRow"}>
                                    <div className={"GameReviews"}><p>All Reviews: </p></div>
                                    <div className={"GameReviewPersentage"}><p> Overwhelmingly Positive (96%)</p></div>
                                </div>
                                <div className={"GameReviewsRow"}>
                                    <div className={"GameReviews"}><p>Realease date: 18 May, 2015</p></div>
                                </div>
                                <div className={"GameReviewsRow"}>
                                    <div className={"GameReviews"}><p>Developer: CD PROJEKT RED</p></div>
                                </div>
                                <div className={"GameReviewsRow"}>
                                    <div className={"GameReviews"}><p>Developer: CD PROJEKT RED</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id={"ReviewBar"}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography >The dark places of the land are full of the habitations of violence.</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div>
                                <p>In The Witcher 3: Wild Hunt, the sacred is always at war with the profane, and beauty is always at war with blood. The series has always contrasted its world's physical glamor with its intrinsic violence, but never has that contrast been this uneasy, this convulsive. That The Witcher 3 depicts the immediate brutality of battle in great detail is not a surprise; many games fill the screen with decapitated heads and gory entrails. It's the way this incredible adventure portrays the personal tragedies and underhanded opportunities that such battles provide that makes it so extraordinary.</p>
                                <p>It is more than its thematic turbulence that makes The Witcher 3 extraordinary, actually. Excellence abounds at every turn in this open-world role-playing game: excellent exploration, excellent creature design, excellent combat mechanics, excellent character progression. But the moments that linger are those that reveal the deep ache in the world's inhabitants. In one quest, you reunite two lovers, one of which is now a rotting hag, its tongue lasciviously lolling from its mouth. In another, a corpulent spouse-abuser must find a way to love two different lost souls, each of which test the limits of his affection. Don't worry that these vague descriptions spoil important events: they are simple examples of the obstacles every resident faces. On the isles of Skellige and in the city of Novigrad, there is no joy without parallel sorrow. Every triumph demands a sacrifice.</p>
                                <p>From one hour to the next, the compulsion to examine the landscape grows. Some of the joys that arise in the wilds are quiet ones: you mount your horse Roach and trot over the hill in time to see a rich sunset, always a treat in The Witcher 3, whose saturated reds and oranges make the sky look as beautiful and as blood-sodden as the meadows beneath them. You discover a boat and embark on an impromptu voyage through the islands of Skellige, taking note of the ship wreckage that mars the beaches and cliffs. The music swells, and a soprano intones a euphoric melody that accentuates the peacefulness. The peacefulness is always broken, however--perhaps by a journey into a dark dungeon where your torch lights the pockmarked walls and a snarling fiend waits to devour you, or by the shout of a boy crying out for your assistance.</p>
                                <p>The Witcher 3: Wild Hunt is undoubtedly beautiful regardless of platform, though prone to occasional bugs and visual glitches. Solving a quest's subtasks in a particular order caused the game to stick at a perpetual loading screen. Roach decided to stop galloping and lurch ahead in a weird way for minutes on end until I quick-traveled away and returned. Geralt's hair blew in the wind, even when he was indoors. It's jarring should you enter an area after quick-traveling and the citizens have yet to pop in, including quest-givers. Along with occasional console frame rate jitters, these elements may prove distracting to you should they arise, depending on your level of tolerance; even so, Geralt's newest adventure is such an achievement that I was rarely disturbed by the glitches I encountered.</p>
                                <p>These distractions stand out in part because The Witcher 3: Wild Hunt is otherwise incredible and sumptuous; the little quirks are pronounced when they are surrounded by stellar details. And make no mistake: this is one of the best role-playing games ever crafted, a titan among giants and the standard-setter for all such games going forward. Where the Witcher 2 sputtered to a halt, The Witcher 3 is always in a crescendo, crafting battle scenarios that constantly one-up the last, until you reach the explosive finale and recover in the glow of the game's quiet denouement. But while the grand clashes are captivating, it is the moments between conflicts, when you drink with the local clans and bask in a trobairitz's song, that are truly inspiring.</p>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography >The charactors elevate The Witcher 3 to a plane few other RPGs inhabit.</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div>
                                <p>Unlike its predecessor, The Witcher 3: Wild Hunt doesn't exactly come screaming off the starting line. Compared to The Witcher 2, where you're immediately plunged headlong into a sexy story of intrigue and betrayal, this main quest can seem mundane, even perfunctory at times. But each time I stepped off the well-beaten path to blaze my own trail, it turned into a wild, open, exhilarating fantasy roleplaying experience, rife with opportunities to make use of its excellent combat. Even after over 100 hours with The Witcher 3, it still tempts me to press on – there’s so much more I want to learn, and hunt.</p>
                                <p>The Witcher 3 is as dense and deep as the other two games in the series in terms of RPG mechanics, and the overwhelmingly massive open-world environment has at once made that depth more intimidating, and in the long run, more rewarding. It’s difficult to express just how huge and open this world is: verdant, rolling fields liberally dotted with swaying foliage of every shape and size fill the space between loosely connected, ramshackle townships where people struggle to scrape by. A full day/night cycle and dynamic weather pull it all together, cementing The Witcher 3’s landscape as one of the most authentic-feeling open worlds I’ve ever seen. A handy minimap points you where you want to go, which might seem like a crutch, but honestly, without it, I’d have been hopelessly lost. That a world this size still feels so purposeful, and full of things to do is quite an achievement.</p>
                                <p>Thanks to lots of excellent dialogue and voice acting there is some emotional payoff along the way, but it’s mixed in with too much padding in the form of meaningless fetch quests and collectathons. Every time I felt like I was on the verge of an interesting revelation, I’d have to suddenly stop to escort a goat, or search for a lost, narcoleptic dwarf. Heck, even Geralt can barely hide his frustration with the constant parade of menial tasks at times.</p>
                                <p>Thankfully, they all get chances to shine once you venture off the beaten path, and that’s where The Witcher 3 gets nearly everything incredibly right. Depending on your decisions in The Witcher 2 (which can be handily recreated via some dialogue early in the game), you’ll see lots of familiar faces returning to play a role in Geralt’s search, and once they have, they offer you a secondary line of quests that typically provide far more interesting scenarios to dabble in. Underground turf wars, assassination plots, love triangles, and unexpected alliances are all part of these optional romps. They’re all so meaty and full of rich story content that they feel like they should have been part of the main story.</p>
                                <p>All of this shines through in The Witcher 3’s responsive, brutal real-time combat. Where combat in this series has up until this point felt vague and even a bit clunky, here it’s so fluid and satisfying that I walk around hoping for bandits to jump me just so I can repel their attacks with magical barriers, parry their blows with uncanny precision, and relieve them of life and/or limb with the occasional gory flourish. The Witcher has always done a great job of making me feel that I’ve outsmarted my foes, but for the first time here, controlling Geralt feels tangibly badass with every successful fight.</p>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </div>
        );
    }

}
