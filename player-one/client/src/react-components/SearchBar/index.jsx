import Select from 'react-select'
import React from "react";
import {withRouter} from 'react-router-dom';

import './styles.css'

class SearchBar extends React.Component{
    state = {
        selectedOption: null,
        game_list: [],
        search_list: []
    };

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        if (selectedOption) {
            console.log(selectedOption);
            const redirectURL = "/games/" + selectedOption.value;
            this.props.history.push(redirectURL);
            // alert("selected Game " + selectedOption.label + " with id " + selectedOption.value);
            // code to make something happen after selecting an option
        }
    };

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
                console.log("something wrong happened in index.jsx")
                console.log(res)
            }
        }).then(data => {
            console.log("setting state...")
            this.setState({game_list: data.allGames});
            console.log("set state complete")
            console.log(this.state.game_list);
            const searchList = this.state.game_list.map(
                ({ gameName, _id }) => {
                    return{
                        value: _id, // id in data base
                        label: gameName // displayed for searching
                    }
                }
            );
            this.setState({search_list: searchList});
            console.log("parsed search list")
            console.log(this.state.search_list);
        }).catch(e => console.log(e))
    }


    render() {
        return (
            <div className={"searchBar"}>
                <Select
                    value={this.state.selectedOption}
                    options={this.state.search_list}
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

export default withRouter(SearchBar);
