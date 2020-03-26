import React from "react";
import {useHistory} from 'react-router-dom';
import {useCookies} from "react-cookie";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
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

    const {sections, title} = props;

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
                                    <a href="/the_witcher_3_wild_hunt">The Witcher 3: Wild Hunt</a>
                                    <a href="/">Game 2</a>
                                    <a href="/">Game 3</a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <SearchBar/>
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
                                        <a href="/the_witcher_3_wild_hunt">The Witcher 3: Wild Hunt</a>
                                        <a href="/">Game 2</a>
                                        <a href="/">Game 3</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <SearchBar/>
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
                                        <a href="/the_witcher_3_wild_hunt">The Witcher 3: Wild Hunt</a>
                                        <a href="/">Game 2</a>
                                        <a href="/">Game 3</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <SearchBar/>
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