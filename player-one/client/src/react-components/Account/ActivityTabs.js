import React, { useState, useEffect } from "react";
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

function ScrollableTabsButtonPrevent(props) {
  const { likes, comments } = props
  console.log(comments)
  console.log(likes)
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [recentComments, setComments] = useState([])
  const [recentLikes, setLikes] = useState([])

  useEffect(() => {
    setComments(comments)
    setLikes(likes)
  })

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
          </Tabs>
        </Paper>
      </AppBar>
      <TabPanel value={value} index={1}>
        <div className="recentReviews">
          {comments.map(comment => (
            <div className="recentReview">
              <p className="recentReviewTime">{comment.time}</p>
              <p className="recentReviewText">{comment.commentBody}</p>
              <div className="recentReviewGame">
                <img src={comment.gameInfo ? comment.gameInfo.gamePicture : null} alt="review1" />
                <Link href={comment.gameInfo ? comment.gameInfo.gameURL : null} color="primary">
                  {comment.gameInfo ? comment.gameInfo.gameName : null}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={0}>
        <div className="recentLikes">
          {likes.map(like => (
            <div className="recentLike">
              <img src={like ? like.gamePicture : null} alt="game1" />
              <Link href={like ? like.gameURL : null} color="primary">
                {like ? like.gameName : null}
              </Link>
            </div>
          ))}
        </div>
      </TabPanel>
    </div>
  );
}

export default React.memo(ScrollableTabsButtonPrevent)
