import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

const ToDo = () => {
    const [todo, setTodo] = useState('');
    const [debouncedTodo, setDebouncedTodo] = useState(todo);
    const [todolist, setTodoslist] = useState([]);

    useEffect(() => {
        const timerId = setTimeout(() => {
          setDebouncedTodo(todo);
        }, 250);

        return () => {
          clearTimeout(timerId);
        };
    }, [todo]);
    
    useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get('http://localhost:4000/list');
        setTodoslist(response.data);
    };
    fetchData();
    }, [debouncedTodo]);

    function inputSubmit(e) {
        e.preventDefault();
        const obj = {
            id:null,
            name: todo,
            erledigt: 0
        };
        axios.post('http://localhost:4000/create', obj)
           .then(res => console.log(res.data));
           const tmp = todolist.filter( u => u.todo !== todo );
           setTodoslist(tmp);
           setTodo('');
    }

    function deleteThis(id){
        axios.post('http://localhost:4000/delete/' + id)
            .then(res => console.log(res.data));
        const tmp = todolist.filter( u => u.id !== id );
        setTodoslist(tmp);
    }

    return (
        <Fragment>
            <h2 className='ui header'>was ist zu tun?</h2>
            <form onSubmit={inputSubmit} className='ui form'>
                <label>neues To Do eintragen: </label>
                <input
                className='ui input'
                type='text'
                value={todo}
                onChange={e => setTodo(e.target.value)}>
                </input>
            </form>
            <table className='ui celled collapsing very basic table'>
            <tbody>
            {todolist.map(todoItem => (
                    <tr key={todoItem.id}>
                        <td>{todoItem.name}</td><td><button onClick={e => deleteThis(todoItem.id)}><i className='check icon'></i></button></td>
                    </tr>
                ))}
            </tbody>
            </table>
        </Fragment>
    )
}

export default ToDo;
