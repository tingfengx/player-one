import React, {Component} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './styles.css'

export default class CarouselSlides extends Component {
    state = {
        hottestGames: undefined,
        imgs: []
    }

    componentDidMount = () => {
        // const baseURL = "http://localhost:5000"
        const baseURL = "";
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
            this.setState({hottestGames: data.hottestGames});
            console.log("Carousels Fetch States Set Complete")
            console.log(this.state.hottestGames);
            let imagesCache = [];
            for (let i = 0; i < this.state.hottestGames.length; i++) {
                imagesCache.push({
                    urlToPush: "/viewgames/" + this.state.hottestGames[i]._id,
                    imageLink: this.state.hottestGames[i].gamePictures[0]
                })
            }
            this.setState({imgs: imagesCache});
        }).catch(e => console.log(e))
    }

    render() {
        const settings = {
            dots: false,
            dotsClass: "slick-dots",
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            pauseOnHover: true,
            arrows: false
        };

        return (
            <div>
                <Slider {...settings}>
                    {
                        this.state.imgs.map(img => (
                            <div key={img}>
                                <a href={img.urlToPush}><img id={"featuredGamesSlider"} src={img.imageLink} alt={"Home Page Images"}/></a>
                            </div>
                        ))
                    }
                </Slider>
            </div>
        );
    }
}
