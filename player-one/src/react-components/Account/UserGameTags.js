import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function OutlinedChipsGame(props) {
  const classes = useStyles();
  const {tags} = props;

  return (
    <div className={classes.root}>
        {tags.map(tag => (
            <Chip label={tag} variant="outlined" color="primary"/>
        ))}
    </div>
  );
}
