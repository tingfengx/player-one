import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import React from "react";
import './styles.css'
import Typography from "@material-ui/core/Typography";

export default function (props) {
    const {username, commentText} = props;

    return (
        <div>
            <ListItem alignItems="flex-start">
                <ListItemText
                    primary={
                        <div className={"CommentTextContainer"}>
                            {commentText}
                        </div>
                    }
                    secondary={
                        <Typography
                            className={"ShortCommentUsername"}
                            color={"textSecondary"}
                            variant={"body2"}>
                            {username}
                        </Typography>
                    }
                />
            </ListItem>
            <Divider />
        </div>
    );
}