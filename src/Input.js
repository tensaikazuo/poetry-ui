import React, { useState } from 'react';

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
    '& button': {
      margin: '0 8px',
    }
  },
  flexSec: {
    display: 'flex',
    justifyContent: 'center',
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
  },
  preview: {
    width: '600px',
    margin: '0 auto',
  },
});

const Input = props => {
  const { register, handleSubmit } = useForm();
  const { action } = useStateMachine(updateAction);
  const onSubmit = data => {
    action(data);
    props.history.push("./output");
  };

  const classes = useStyles();

  const [cntLetter, setCntLetter] = useState(0);
  const [cntLine, setCntLine] = useState(0);
  const [content, setContent] = useState('');
  const [cfd, setCfd] = useState('');

  function handleInputChange(e) {
    const target = e.target;
    setContent(target.value);
  }
  function updateCfd() {
    setCfd(content);
  }
  function handleCount() {
    setCntLetter(countLetters(content));
    setCntLine(countLines(content));
  }
  function countLetters(text) {
    let numberOfNewlineChara = 0;
    let position = text.indexOf('\n');
    while (position !== -1) {
      numberOfNewlineChara++;
      position = text.indexOf('\n', position + 1);
    }
    return content.length - numberOfNewlineChara;
  }
  function countLines(text) {
    const regex = /\n{2,}/g;
    const trimmedContent = text.replace(regex, '\n');
    const arr = trimmedContent.split('\n');
    const arrTrimmed = arr.filter(elem => elem !== '');
    const arrLength = arrTrimmed.length;
    return arrLength;
  }
  function processText(text) {
    const regex = /\n{3,}/g;
    const trimmedContent = text.replace(regex, '\n\n');
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
    return content;
  }

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
          <TextareaAutosize
            name="content"
            rowsMin={10}
            placeholder="Please write your work..."
            className={classes.contentInput}
            ref={register}
            onChange={handleInputChange}
            onKeyUp={handleCount}
          />
          <span>文字数：{cntLetter}</span><br />
          <span>行数：{cntLine}</span>
        </div>
        <div className={`${classes.button} ${classes.flexSec}`}>
          <Button variant="outlined" onClick={()=>updateCfd()}>Preview</Button>
          <Button variant="outlined" type="submit">Output</Button>
        </div>
      </form>
      <hr />
      <div className={classes.preview}>{processText(cfd)}</div>
    </>
  );
}

export default withRouter(Input);
