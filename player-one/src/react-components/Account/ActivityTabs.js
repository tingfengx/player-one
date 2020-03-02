import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ThumbUpRoundedIcon from "@material-ui/icons/ThumbUpRounded";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

import gameCoverImageSrc from "../../imgs/the_witcher_3_wild_hunt/cover.jpg";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function ScrollableTabsButtonPrevent() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Paper square>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="off"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable prevent tabs example"
          >
            <Tab
              label="Recent Likes"
              icon={<ThumbUpRoundedIcon />}
              {...a11yProps(0)}
            />
            <Tab
              label="Recent reviews"
              icon={<CreateRoundedIcon />}
              {...a11yProps(1)}
            />
            {/* <Tab icon={<BookmarkRoundedIcon />} {...a11yProps(2)} /> */}
          </Tabs>
        </Paper>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className="recentLikes">
          <div className="recentLike">
            <img src={gameCoverImageSrc} />
            <Link href="/the_witcher_3_wild_hunt" color="primary">
              The Witcher 3: Wild Hunt
            </Link>
          </div>
          <div className="recentLike">
            <img src={gameCoverImageSrc} />
            <Link href="/the_witcher_3_wild_hunt" color="primary">
              The Witcher 3: Wild Hunt
            </Link>
          </div>
          <div className="recentLike">
            <img src={gameCoverImageSrc} />
            <Link href="/the_witcher_3_wild_hunt" color="primary">
              The Witcher 3: Wild Hunt
            </Link>
          </div>
          <div className="recentLike">
            <img src={gameCoverImageSrc} />
            <Link href="/the_witcher_3_wild_hunt" color="primary">
              The Witcher 3: Wild Hunt
            </Link>
          </div>
          <div className="recentLike">
            <img src={gameCoverImageSrc} />
            <Link href="/the_witcher_3_wild_hunt" color="primary">
              The Witcher 3: Wild Hunt
            </Link>
          </div>
          <div className="recentLike">
            <img src={gameCoverImageSrc} />
            <Link href="/the_witcher_3_wild_hunt" color="primary">
              The Witcher 3: Wild Hunt
            </Link>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="recentReviews">
          <div className="recentReview">
            <p className="recentReviewTime">2020-3-2 12:34:56</p>
            <p className="recentReviewText">I love this game! The Witcher 3 is the best!</p>
            <div className="recentReviewGame">
              <img src={gameCoverImageSrc} />
              <Link href="/the_witcher_3_wild_hunt" color="primary">
              The Witcher 3: Wild Hunt
            </Link>
            </div>
          </div>
          <div className="recentReview">
            <p className="recentReviewTime">2020-3-2 12:34:56</p>
            <p className="recentReviewText">This game is so great that I have been playing it like everyday! I highly recommend you guys take a look! It won't disappoint you!</p>
            <div className="recentReviewGame">
              <img src={gameCoverImageSrc} />
              <Link href="/the_witcher_3_wild_hunt" color="primary">
              The Witcher 3: Wild Hunt
            </Link>
            </div>
          </div>
        </div>
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        Display recent bookmarks
      </TabPanel> */}
    </div>
  );
}
