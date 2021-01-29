import React, { Fragment, useState } from 'react';
import axios from 'axios';

const Antwortmoeglichkeiten = ({id}) => {
    const [antwortOptionen, setAntwortOptionen] = useState([]);
    const [antwort, setAntwort] = useState('');

    function submitAntwort(e){
        e.preventDefault();
        setAntwortOptionen(prevState => [...prevState, antwort]);
        setAntwort('');
    }

    function submitOptionen(e){
        e.preventDefault();
        const obj = antwortOptionen;
        axios.post('http://localhost:4000/umfrage/update/' + id, obj)
            .then(res => {console.log(res.data); setAntwortOptionen([])});
    }

    return (
        <Fragment>
        <h1>Auswahl</h1>
        <form onSubmit={submitAntwort}>
            <input
            type="text"
            name="antwortOption"
            onChange={e => setAntwort(e.target.value)}
            value={antwort}
            ></input>
        </form>
        <div>
            {antwortOptionen.map((item) => 
                <p key={antwortOptionen.indexOf(item)}>{antwortOptionen.indexOf(item) + 1}. {item}</p>
            )}
        </div>
        <div>
            <button onClick={submitOptionen}>Antwortoptionen uebergeben</button>
        </div>
        </Fragment>
    )
}

export default Antwortmoeglichkeiten;