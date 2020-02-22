import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import thumbnail1 from '../../imgs/w3.jpg';
import thumbnail2 from '../../imgs/w3.jpg';
import thumbnail3 from '../../imgs/w3.jpg';
import thumbnail4 from '../../imgs/w3.jpg';
import thumbnail5 from '../../imgs/w3.jpg';


export default function GameCategorySmallCarousel(props) {
    // const {Images} = props;

    const images = [
        thumbnail1, thumbnail2, thumbnail3, thumbnail4, thumbnail5
    ];

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "384px",
        slidesToShow: 1,
        speed: 500,
    };
    return (
        <div>
            <Slider {...settings}>
                {/*{Images.map(image => (*/}
                {/*    <img src={image}*/}
                {/*         alt={"Icon Image Failed to Load"}*/}
                {/*         key={image}*/}
                {/*    />*/}
                {/*))}*/}
                {
                    images.map(image => (
                        <a href={"/"} className={"ClickableImage"}>
                            <img className={"ThumbNailImage"}
                                 src={image}
                                 alt={"Game Thumbnail Failed to Load"}
                                 key={image}
                            /></a>
                    ))
                }
            </Slider>
        </div>
    );
}

//{sections.map(section => (
//                         <div className="dropdown" key={section.title}>
//                             <button
//                                 className="dropbtn">
//                                 {section.title}
//                             </button>
//                             <div className="dropdown-content">
//                                 <a href="/">Game 1</a>
//                                 <a href="/">Game 2</a>
//                                 <a href="/">Game 3</a>
//                             </div>
//                         </div>
//                     ))}