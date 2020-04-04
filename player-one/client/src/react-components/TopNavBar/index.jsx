import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from "react-cookie";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { uid } from 'react-uid'
import Link from "@material-ui/core/Link";
import SearchBar from "../SearchBar";
import Typography from "@material-ui/core/Typography";

import "./styles.css";

const useStyles = makeStyles(theme => ({
    toolbar: {
        borderBottom: `2px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper
    },
    toolbarTitle: {
        flex: 1
    }
}));

export default function TopNavBar(props) {
    const classes = useStyles();
    const history = useHistory();
    const [cookies, , removeCookie] = useCookies();
    const [sections, setSections] = useState([]);

    const { title } = props;

    /**
     * React functional version of ComponentDidMount, 
     * Notice that have to be useEffect(()=>{}, []), i.e. 
     * second argument has to be an emty array for it to load only once
     */
    useEffect(() => {
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
                return res.json();
            } else {
                console.log(res);
            }
        }).then((data) => {
            const sections = [
                { title: "Featured", games: data.hottestGames },
                { title: "Action", games: data.hottestGamesForGenre[0] },
                { title: "Adventure", games: data.hottestGamesForGenre[1] },
                { title: "Casual", games: data.hottestGamesForGenre[2] },
                { title: "Role Playing", games: data.hottestGamesForGenre[3] },
                { title: "Shooting", games: data.hottestGamesForGenre[4] }
            ];
            setSections(sections);
        }).catch(e => console.log(e));
    }, []);


    const handleLogin = () => {
        history.push("/Login")
    };

    const handleSignUp = () => {
        history.push("/Signup")
    };

    const handleSignOut = () => {
        removeCookie("username");
        removeCookie("type");
        removeCookie("isLoggedIn");
    }

    if (!cookies.isLoggedIn) {
        return (
            <React.Fragment>
                <Toolbar className={classes.toolbar}>
                    {/* Place holder for logo */}
                    {/* <span role="img" aria-label="Snowman">&#129409;</span> */}
                    <Typography
                        component="h2"
                        variant="h5"
                        color="inherit"
                        align="center"
                        noWrap
                    >
                        <Link
                            href="/"
                            variant="inherit"
                            color="inherit"
                            underline='none'
                        >
                            {title}
                        </Link>
                    </Typography>
                    <div className={classes.toolbarTitle}>
                        {sections.map(section => (
                            <div className="dropdown" key={section.title}>
                                <button className="dropbtn">{section.title}</button>
                                <div className="dropdown-content">
                                    {
                                        section.games.map(function (game) {
                                            const gameName = game.gameName;
                                            const gameUrl = "/viewgames/" + game._id;
                                            return <a href={gameUrl} key={uid(gameUrl)}>{gameName}</a>
                                        })
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                    <SearchBar />
                    <Typography>

                        <Button variant="outlined" size="large" onClick={handleLogin}>
                            Sign in
                        </Button>
                        <Button variant="outlined" size="large" onClick={handleSignUp}>
                            Sign up
                        </Button>
                    </Typography>
                </Toolbar>
            </React.Fragment>
        );
    } else {
        if (cookies.type === "user" || cookies.type === "superuser") {
            return (
                <React.Fragment>
                    <Toolbar className={classes.toolbar}>
                        {/* Place holder for logo */}
                        {/* <span role="img" aria-label="Snowman">&#129409;</span> */}
                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center"
                            noWrap
                        >
                            <Link
                                href="/"
                                variant="inherit"
                                color="inherit"
                                underline='none'
                            >
                                {title}
                            </Link>
                        </Typography>
                        <div className={classes.toolbarTitle}>
                            {sections.map(section => (
                                <div className="dropdown" key={section.title}>
                                    <button className="dropbtn">{section.title}</button>
                                    <div className="dropdown-content">
                                        {
                                            section.games.map(function (game) {
                                                const gameName = game.gameName;
                                                const gameUrl = "/viewgames/" + game._id;
                                                return <a href={gameUrl} key={uid(gameUrl)}>{gameName}</a>
                                            })
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                        <SearchBar />
                        <div>

                            <div className={"dropdown"}>
                                <Button className={"dropbtn"}>{cookies.username}</Button>
                                <div className={"dropdown-content"}>
                                    <a href={"/user_account"}>My Account</a>
                                    <a href={"/"} onClick={handleSignOut}>Sign Out</a>
                                </div>
                            </div>
                        </div>
                        <div className={"namePaddingRight"}>
                        </div>
                    </Toolbar>
                </React.Fragment>
            )
        } else if (cookies.type === "admin") {
            return (
                <React.Fragment>
                    <Toolbar className={classes.toolbar}>
                        {/* Place holder for logo */}
                        {/* <span role="img" aria-label="Snowman">&#129409;</span> */}
                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center"
                            noWrap
                        >
                            <Link
                                href="/"
                                variant="inherit"
                                color="inherit"
                                underline='none'
                            >
                                {title}
                            </Link>
                        </Typography>
                        <div className={classes.toolbarTitle}>
                            {sections.map(section => (
                                <div className="dropdown" key={section.title}>
                                    <button className="dropbtn">{section.title}</button>
                                    <div className="dropdown-content">
                                        {
                                            section.games.map(function (game) {
                                                const gameName = game.gameName;
                                                const gameUrl = "/viewgames/" + game._id;
                                                return <a href={gameUrl} key={uid(gameUrl)}>{gameName}</a>
                                            })
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                        <SearchBar />
                        <div>
                            <div className={"dropdown"}>
                                <Button className={"dropbtn"}>{cookies.username}</Button>
                                <div className={"dropdown-content"}>
                                    <a href={"/admin"}>Manage</a>
                                    <a href={"/"} onClick={handleSignOut}>Sign Out</a>
                                </div>
                            </div>
                        </div>
                        <div className={"namePaddingRight"}>
                        </div>
                    </Toolbar>
                </React.Fragment>
            )
        }
    }
}

TopNavBar.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string
};
