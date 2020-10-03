import React from 'react';

import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

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
      <div className={classes.title}>
        <Typography variant="h2" component="h1">
          Poetry-UI
        </Typography>
      </div>
      <div className={`${classes.entry} ${classes.mbsm}`}>
        <Typography variant="h3" component="h2">
          {title}
        </Typography>
        {content}
      </div>
    </>
  );
};

export default Output;
