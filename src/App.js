import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Todo from './Todo.js';
import db from './firebase.js';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    db.collection('todos')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        // paima visus duomenis is duomenu bazes
        setTodos(snapshot.docs.map(doc => doc.data().text));
      });
  }, []);

  const addTodo = e => {
    e.preventDefault();

    db.collection('todos').add({
      text: input,
      //isdelioja todo lista pagal ikelimo data
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setTodos([...todos, input]);
    setInput('');
  };

  return (
    <div className="App">
      <h1>My Todo list</h1>
      <form>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={event => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          disabled={!input}
          variant="contained"
          color="primary"
          onClick={addTodo}
          type="submit"
        >
          Add Todo
        </Button>
        <ul>
          {todos.map(todo => (
            <Todo text={todo} />
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
