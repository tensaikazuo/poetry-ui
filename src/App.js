import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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
  }
});

function App() {
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
        <TextField label="Title" className={classes.mbmd} />
        <TextareaAutosize aria-label="minimum height" rowsMin={10} placeholder="Please write your work..." />
      </div>
      <div className={classes.button}>
        <Button variant="outlined">Preview</Button>
      </div>
    </>
  );
}

export default App;
