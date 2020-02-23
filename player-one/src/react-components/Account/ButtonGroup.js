import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


export default function GroupOrientation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup
        orientation="vertical"
        variant="contained"
        // color="secondary"
      >
        <Button>Change Avatar</Button>
        <Button>Change Background Image</Button>
        <Button>Change Password</Button>
      </ButtonGroup>
      </div>
  );
}