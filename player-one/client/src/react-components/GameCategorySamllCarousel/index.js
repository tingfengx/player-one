import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import thumbnail1 from '../../imgs/w3.jpg';
import thumbnail2 from '../../imgs/w3.jpg';
import thumbnail3 from '../../imgs/w3.jpg';
import thumbnail4 from '../../imgs/w3.jpg';
import thumbnail5 from '../../imgs/w3.jpg';
import { uid } from 'react-uid';


class GameCategorySmallCarousel extends React.Component {
    images = [
        thumbnail1, thumbnail2, thumbnail3, thumbnail4, thumbnail5
    ];

    state = {
        hottestGamesCurGenre: []
    }

    componentDidMount = () => {
        const baseURL = "http://localhost:5000"
        const url = baseURL + '/games'

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
                console.log(res)
            }
        }).then(data => {
            // console.log("shit, look at me")
            console.log(data);
            if (this.props.GameCategory === "Action Games") {
                this.setState({hottestGamesCurGenre: data.hottestGamesForGenre[0]});
            } else if (this.props.GameCategory === "Shooting Games") {
                this.setState({hottestGamesCurGenre: data.hottestGamesForGenre[4]});
            } else if (this.props.GameCategory === "Role Playing") {
                this.setState({hottestGamesCurGenre: data.hottestGamesForGenre[3]});
            } else if (this.props.GameCategory === "Adventure") {
                this.setState({hottestGamesCurGenre: data.hottestGamesForGenre[1]});
            } else if (this.props.GameCategory === "Casual Games") {
                this.setState({hottestGamesCurGenre: data.hottestGamesForGenre[2]});
            } else {
                alert("Novel Game Category Received!" + this.props.GameCategory);
            }
            console.log(this.state.hottestGamesCurGenre);
        }).catch(e => console.log(e))
    }


    render() {
        const settings = {
            centerMode: true,
            infinite: true,
            slidesToShow: 2.5,
            speed: 500,
        };

        return (
            <div>
                <Slider {...settings}>
                    {
                        this.state.hottestGamesCurGenre.map(item => (
                            <a href={"/games/" + item._id}
                               className={"ClickableImage"}
                               key={uid(item)}>
                                <img className={"ThumbNailImage"}
                                     src={item.gamePictures[0]}
                                     alt={"Game Thumbnail Failed to Load"}
                                     key={uid(item)}
                                /></a>
                        ))
                    }
                </Slider>
            </div>
        )
    }
}

export default GameCategorySmallCarousel;
