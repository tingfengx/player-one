import React from "react";
import TopNavBar from '../TopNavBar';
import CarouselSlides from '../CarouselSlides';

/* Component for the Home page */
class Home extends React.Component {
    render() {
        const sections = [
            {title: 'Featured', url: '#'},
            {title: 'Trending', url: '#'},
            {title: 'RPG Game', url: '#'},
            {title: 'Leisure', url: '#'},
            {title: 'Scenery', url: '#'},
            {title: 'bruh', url: '#'},
            {title: 'what else', url: '#'},
        ];
        return (
            <div>
                <TopNavBar sections={sections} title="PLAYER ONE"/>
                <CarouselSlides/>
            </div>
        );
    }
}

export default Home;