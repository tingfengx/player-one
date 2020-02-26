import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';

import './styles.css';

const useStyles = makeStyles(theme => ({
    toolbar: {
        borderBottom: `2px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper
    },
    toolbarTitle: {
        flex: 1,
    },
}));

export default function TopNavBar(props) {
    const classes = useStyles();
    const { sections, title, isLoggedIn, username } = props;

    return (
        <React.Fragment>
            <Toolbar className={classes.toolbar}>
                <Button>
                    {/* Place holder for logo */}
                    {/* <span role="img" aria-label="Snowman">&#129409;</span> */}
                    <Typography
                        component="h2"
                        variant="h5"
                        color="inherit"
                        align="center"
                        noWrap
                    >
                        {title}
                    </Typography>
                </Button>
                <div className={classes.toolbarTitle}>
                    {sections.map(section => (
                        <div className="dropdown" key={section.title}>
                            <button
                                className="dropbtn">
                                {section.title}
                            </button>
                            <div className="dropdown-content">
                                <a href="/">Game 1</a>
                                <a href="/">Game 2</a>
                                <a href="/">Game 3</a>
                            </div>
                        </div>
                    ))}
                </div>

                <Typography>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <Button variant="outlined" size="large">
                        Sign in
                </Button>
                    <Button variant="outlined" size="large">
                        Sign up
                </Button>
                </Typography>

            </Toolbar>
        </React.Fragment>
    );
}

TopNavBar.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string,
};
