import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';

import './Todo.css';
import db from './firebase';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import firebase from './firebase.js';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#F0FFFF',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  const remove = e => {
    db.collection('todos')
      .doc(props.todo.id)
      .delete();
  };

  const updateTodo = () => {
    db.collection('todos')
      .doc(props.todo.id)
      .set(
        {
          text: input
        },
        { merge: true }
      );
    setOpen(false);
  };

  return (
    <>
      <Modal
        className={classes.paper}
        open={open}
        onClose={e => setOpen(false)}
      >
        <div>
          <h1>{props.todo.todo}</h1>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={event => setInput(event.target.value)}
          />
          <Button onClick={updateTodo}>Update Todo</Button>
        </div>
      </Modal>

      <List>
        <ListItem>
          <ListItemText primary={props.todo.todo} secondary="Todo 🔥" />
        </ListItem>
        <Button
          onClick={e => {
            setOpen(true);
          }}
        >
          Edit me
        </Button>
        <DeleteForeverIcon onClick={remove} />
      </List>
    </>
  );
}

export default Todo;
