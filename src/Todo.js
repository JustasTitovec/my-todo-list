import React, { useState } from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import './Todo.css';
import db from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#FFFFFF',
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
      <Modal className="todo__modal" open={open} onClose={e => setOpen(false)}>
        <div className={classes.paper}>
          <h1>{props.todo.todo}</h1>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={event => setInput(event.target.value)}
          />
          <Button onClick={updateTodo}>Update Todo</Button>
        </div>
      </Modal>

      <div className="todo__item">
        <div>
          <ListItem>
            <ListItemText primary={props.todo.todo} secondary="Todo ✏️" />
          </ListItem>
        </div>
        <div className="todo__edit">
          <Button
            onClick={e => {
              setOpen(true);
            }}
          >
            Edit me
          </Button>
          <DeleteForeverIcon onClick={remove} className="todo__delete" />
        </div>
      </div>
    </>
  );
}

export default Todo;
