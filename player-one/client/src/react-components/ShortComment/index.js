import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import './styles.css'
import Typography from "@material-ui/core/Typography";

export default function (props) {
    const {username, commentBody} = props;

    return (
        <div>
            <ListItem alignItems="flex-start">
                <ListItemText
                    primary={
                        <div className={"commentBodyContainer"}>
                            {commentBody}
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
        </div>
    );
}