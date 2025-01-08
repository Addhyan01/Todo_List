import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : []
  });
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


        const addTodo = () => {
          if(newTodo.trim() === "") return
          const current = new Date().toDateString();
          setTodos([...todos, {text : newTodo, completed : false, time:current }])
          alert("Add")
          setNewTodo("");
        }


        const deleteTodo = (index) => {
          const updatedTodo = todos.filter((_, i) => i !== index);
          setTodos(updatedTodo);
          alert("delete Sucessfully")
          
          
        }

        const toggle = (index) =>{
          const updatedTodo = todos.map((todo, i ) => 
            i === index ? {...todo, completed: !todo.completed } : todo
          );
          setTodos(updatedTodo);

        };


        const clearTodo = () => {
          localStorage.clear();
          setTodos([]);
          alert("Clear Todo List");
        }

  return (
    <>
    <div className='App'>
      <h1>Todo List</h1>
      <div className='todo-input'>
        <input type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder='New Todo'
        />
        <button onClick={addTodo}> Add</button>
        <button onClick={clearTodo}>Clear List</button>
      </div>
      <ul className='todo-list'>
        <li>
          <p>S.No</p>
          <p>Time & Date</p>
          <p>Status</p>
          <p>Todo</p>
          <p>Action</p>
        </li>
        {
          todos.map((todo, index) => (
            <li key={index} className={todo.completed ? "completed" : ""}>
              <p>{index + 1 }</p>
              <p > {todo.time}</p>
              <p>{todo.completed ? "Completed" : "Pending"}</p>
              <span onClick={() => toggle(index)}>{todo.text}</span>
              <button className='delete' onClick={() => deleteTodo(index)} >Delete</button>

            </li>

          ))
        }
      </ul>
    </div>
     
    </>
  )
}

export default App
