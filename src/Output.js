import React from 'react';

import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
//import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
//import TextField from '@material-ui/core/TextField';
//import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  title: {
    textAlign: 'center',
  },
  entry: {
    width: '600px',
    margin: '0 auto',
    '& textarea': {
      width: '100%',
    },
  },
  button: {
    textAlign: 'center',
  },
  mbsm: {
    marginBottom: '8px',
  },
  mbmd: {
    marginBottom: '16px',
  }
});

const Output = props => {
  const { state } = useStateMachine(updateAction);
  console.log(state.data);

  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <div className={classes.title}>
        <Typography variant="h2" component="h1">
          Poetry-UI
        </Typography>
      </div>
      <div className={`${classes.entry} ${classes.mbsm}`}>
        <pre>{JSON.stringify(state, null, 2)}</pre>;
      </div>
    </>
  );
}

export default Output;
