import React, {Component} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './styles.css'
// Featured Games Images, for front page display
import game1 from '../../imgs/w3.jpg'
import game2 from '../../imgs/w3.jpg'
import game3 from '../../imgs/w3.jpg'
import game4 from '../../imgs/w3.jpg'
import game5 from '../../imgs/w3.jpg'


export default class CarouselSlides extends Component {
    imgs = [
        game1, game2, game3, game4, game5
    ];

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
                        this.imgs.map(img => (
                            <div key={img}>
                                <a href={"/the_witcher_3_wild_hunt"}><img id={"featuredGamesSlider"} src={img}
                                                                          alt={"Home Page Images"}/></a>
                            </div>
                        ))
                    }
                </Slider>
            </div>
        );
    }
}
