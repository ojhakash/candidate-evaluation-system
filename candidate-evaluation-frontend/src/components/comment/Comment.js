import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@material-ui/core";
import Faker from "faker";
import SupervisedUserCircle  from "@material-ui/icons/SupervisedUserCircleOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  fonts: {
    fontWeight: "bold",
  },
  inline: {
    display: "inline",
  },
}));

const Comment = ({ comments }) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {comments &&
        comments.map((comment) => {
          return (
            <React.Fragment key={comment.comment_id}>
              <ListItem key={comment.comment_id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <SupervisedUserCircle />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className={classes.fonts}>
                      {comment.admin ? comment.admin.name : "anonymous"}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {comment.admin && comment.admin.email}
                      </Typography>
                      {` - ${comment.commentText}`}
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
    </List>
  );
};

export default Comment;
