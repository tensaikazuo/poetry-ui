import React, { useState, useEffect } from 'react';

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
  root: {
    '& p': {
      margin: 0,
      padding: 0,
    },
  },
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
    marginTop: '24px',
    borderTop: '1px dotted rgba(0, 0, 0, 0.23)',
    counterReset: 'lines',
    width: '600px',
    margin: '0 auto',
    '& span::before': {
      counterIncrement: 'lines',
      content: 'counter(lines)',
      marginRight: '8px',
      color: 'rgba(0, 0, 0, 0.23)',
    },
    '& p': {
        marginTop: '1em',
        '& :first-child': {
          marginTop: '24px',
        },
    },
  },
});

const Input = props => {
  const { register, handleSubmit } = useForm();
  const { action } = useStateMachine(updateAction);
  const onSubmit = data => {
    action(data);
    props.history.push("./output");
  };

  const { state } = useStateMachine(updateAction);
  const title = state.data.title;
  const rawContent = state.data.content;

  const classes = useStyles();

  const [cntLetter, setCntLetter] = useState(0);
  const [cntLine, setCntLine] = useState(0);
  const [content, setContent] = useState('');
  const [cfd, setCfd] = useState('');

  const handleInputChange = e => {
    const target = e.target;
    setContent(target.value);
  };
  const updateCfd = () => {
    setCfd(content);
  };
  const handleCount= () => {
    setCntLetter(countLetters(content));
    setCntLine(countLines(content));
  };
  const countLetters = text => {
    let numberOfNewlineChara = 0;
    let position = text.indexOf('\n');
    while (position !== -1) {
      numberOfNewlineChara++;
      position = text.indexOf('\n', position + 1);
    }
    return text.length - numberOfNewlineChara;
  };

  const countLines = text => {
    const regex = /\n{2,}/g;
    const trimmedContent = text.replace(regex, '\n');
    const arr = trimmedContent.split('\n');
    const arrTrimmed = arr.filter(elem => elem !== '');
    const arrLength = arrTrimmed.length;
    return arrLength;
  };

  const ProcessText = props => {
    const regex = /\n{3,}/g;
    const trimmedContent = props.text.replace(regex, '\n\n');
    const content = trimmedContent.split('\n\n')
      .map((str, index) => {
        const stanza = str.split('\n')
          .map((str, index, arr) => {
            if (index !== (arr.length - 1)) {
              return <React.Fragment key={index}><span>{str}</span><br /></React.Fragment>;
            } else {
              return (str !=='') ? <React.Fragment key={index}><span>{str}</span></React.Fragment> : null;
            }
          });
        return <p key={index}>{stanza}</p>;
      });
    return content;
  }

  useEffect(()=>{
    const onLoad = () => {
      const initText = state.data.content

      const countLettersE = text => {
        let numberOfNewlineChara = 0;
        let position = text.indexOf('\n');
        while (position !== -1) {
          numberOfNewlineChara++;
          position = text.indexOf('\n', position + 1);
        }
        return text.length - numberOfNewlineChara;
      };
      const resultLetters = countLettersE(initText);

      const countLinesE = text => {
        const regex = /\n{2,}/g;
        const trimmedContent = text.replace(regex, '\n');
        const arr = trimmedContent.split('\n');
        const arrTrimmed = arr.filter(elem => elem !== '');
        const arrLength = arrTrimmed.length;
        return arrLength;
      };
      const resultLines = countLinesE(initText);

      setCntLetter(resultLetters);
      setCntLine(resultLines);
    };
    onLoad();
  },[state.data.content]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.title}>
        <Typography variant="h2" component="h1">
          Poetry-UI
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${classes.entry} ${classes.mbsm}`}>
          <input name="title" placeholder="Title" className={`${classes.mbmd} ${classes.titleInput}`} defaultValue={title ? title : ''} ref={register} />
          <TextareaAutosize
            name="content"
            rowsMin={10}
            placeholder="Please write your work..."
            className={classes.contentInput}
            defaultValue={rawContent ? rawContent : ''}
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
      <div className={classes.preview}><ProcessText text={cfd} /></div>
    </div>
  );
}

export default withRouter(Input);
