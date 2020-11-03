import React from 'react';

import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { withRouter } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
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
    '& button': {
      marginTop: '16px',
    },
    textAlign: 'center',
    borderTop: '1px dotted rgba(0, 0, 0, 0.23)',
  },
  mbsm: {
    marginBottom: '8px',
  },
  mbmd: {
    marginBottom: '16px',
  }
});

const Output = props => {
  const onSubmit = () => {
    props.history.push("./");
  };
  const { state } = useStateMachine(updateAction);
  const title = state.data.title;
  const rawContent = state.data.content;
  const regex = /\n{3,}/g;
  const trimmedContent = rawContent.replace(regex, '\n\n');
  const content = trimmedContent.split('\n\n')
    .map((str, index) => {
      const stanza = str.split('\n')
        .map((str, index, arr) => {
          if (index !== (arr.length - 1)) {
            return <React.Fragment key={index}>{str}<br /></React.Fragment>;
          } else {
            return <React.Fragment key={index}>{str}</React.Fragment>;
          }
        });
      return <p key={index}>{stanza}</p>;
    });
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <div className={`${classes.title} ${classes.mbmd}`}>
        <Typography variant="h4" component="h1">
          Poetry-UI
        </Typography>
      </div>
      <div className={`${classes.entry} ${classes.mbsm}`}>
        <Typography variant="h3" component="h2">
          {title}
        </Typography>
        {content}
      </div>
      <div className={classes.button}>
        <form onSubmit={onSubmit}><Button variant="outlined" type="submit">Back</Button></form>
      </div>
    </>
  );
};

export default withRouter(Output);
