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


export default function GameCategorySmallCarousel(props) {
    // const {Images} = props;

    const images = [
        thumbnail1, thumbnail2, thumbnail3, thumbnail4, thumbnail5
    ];

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
                    images.map(image => (
                        <a href={"/"}
                           className={"ClickableImage"}
                           key={uid(image)}>
                            <img className={"ThumbNailImage"}
                                 src={image}
                                 alt={"Game Thumbnail Failed to Load"}
                                 key={uid(image)}
                            /></a>
                    ))
                }
            </Slider>
        </div>
    );
}
