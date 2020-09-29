import React from 'react';

import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
  },
  titleInput: {
    padding: '2px',
    borderRight: 'none',
    borderLeft: 'none',
    borderTop: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.23)',
    outline: 'none',
    fontSize: '1.2rem',
    backgroundColor: '#fafafa',
  },
  contentInput: {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '4px',
    outline: 'none',
    backgroundColor: '#fafafa',
    resize: 'vertical',
  }
});

const Input = props => {
  const { register, handleSubmit } = useForm();
  const { action } = useStateMachine(updateAction);
  const onSubmit = data => {
    action(data);
    props.history.push("./output");
  };

  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <div className={classes.title}>
        <Typography variant="h2" component="h1">
          Poetry-UI
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${classes.entry} ${classes.mbsm}`}>
          <input name="title" placeholder="Title" className={`${classes.mbmd} ${classes.titleInput}`} ref={register} />
          <TextareaAutosize name="content" rowsMin={10} placeholder="Please write your work..." className={classes.contentInput} ref={register} />
        </div>
        <div className={classes.button}>
          <Button variant="outlined" type="submit">Preview</Button>
        </div>
      </form>
    </>
  );
}

export default withRouter(Input);
