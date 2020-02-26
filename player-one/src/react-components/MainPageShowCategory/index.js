import React from 'react';
import GameCategorySmallCarousel from "../GameCategorySamllCarousel";
import './styles.css';


export default function MainPageShowCategory(props) {
    const { GameCategory, CategoryDescription, Images } = props;

    return (
        <div className={"GameShowCaseContainer"}>
            <div className={"GameCategoryName"}>
                {GameCategory}
                <div className={"GameCategoryDescription"}>
                    {CategoryDescription}
                </div>
            </div>
            <div className={"GameCategorySmallCarousel"}>
                <GameCategorySmallCarousel Images={Images}/>
            </div>
        </div>
    );
}
