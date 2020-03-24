import Select from 'react-select'
import React from "react";

import './styles.css'

class SearchBar extends React.Component{
    state = {
        selectedOption: null,
    };

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        if (selectedOption) {
            console.log(selectedOption);
            alert("selected Game " + selectedOption.label + " with id " + selectedOption.value);
            // code to make something happen after selecting an option
        }
    };

    gameList = [
        {game_name: "GTA5", gameId: 1},
        {game_name: "witcher 3", gameId: 2},
        {game_name: "ICEY", gameId: 3}
    ];// load this from server
    /* searching list: preprocess */
    searchList = this.gameList.map(
        ({ game_name, gameId }) => {
            return{
                value: gameId, // id in data base
                label: game_name // displayed for searching
            }
        }
    );

    render() {
        return (
            <div className={"searchBar"}>
                <Select
                    value={this.state.selectedOption}
                    options={this.searchList}
                    isClearable={true}
                    isSearchable={true}
                    onChange={this.handleChange}
                    placeholder= "Search Your Favorite Game..."
                    openMenuOnClick={false}
                />
            </div>
        );
    }
}

export default SearchBar;