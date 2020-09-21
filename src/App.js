import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
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
});

function App() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <div className={classes.title}>
        <Typography variant="h2" component="h1" gutterBottom>
          Poetry-UI
        </Typography>
      </div>
      <div className={classes.entry}>
        <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Please write your work..." />
      </div>
    </>
  );
}

export default App;
