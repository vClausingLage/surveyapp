import React, { Fragment, useState } from 'react';
import axios from 'axios';

const UmfrageErstellen = () => {
    const [umfrageName, setUmfrageName] = useState('');
    const [inputFrage, setInputFrage] = useState('');
    const [fragen, setFragen] = useState([]);
    
    function onSubmit(e) {
        e.preventDefault();
    }

    function submitFrage(e){
        e.preventDefault();
        setFragen(prevState => [...prevState, inputFrage]);
        setInputFrage('');
    }

    function submitUmfrage(e){
        e.preventDefault();
        const obj = {name: umfrageName, fragen: fragen};
        axios.post('http://localhost:4000/umfrage/create', obj)
            .then(res => {console.log(res.data); setFragen([])});
    }
    
    return (
        <Fragment>
            <h1>Umfrage erstellen</h1>
            {umfrageName}
            <div className="grid-item">
                <h2>Eingabe</h2>
            <div className="container">
                <form onSubmit={onSubmit}>
                    <label>Geben Sie einen Namen für die Umfrage ein:  </label>
                    <input 
                    type="text"
                    name="umfrageName"
                    onChange={e => setUmfrageName(e.target.value)}
                    value={umfrageName}>
                    </input>
                </form>
            </div>
            <div className="container">
                {fragen.map((item) => 
                    <p key={fragen.indexOf(item)}>{fragen.indexOf(item) + 1}. {item}</p>
                )}
            </div>
            <div className="container">
                <p>Fragen erstellen:</p>
                <form onSubmit={submitFrage}>
                    <input
                    type="text"
                    name="inputFrage"
                    onChange={e => setInputFrage(e.target.value)}
                    value={inputFrage}>
                    </input>
                </form>
            </div>
            </div>
            <div className="grid-item">
                <h2>Vorschau</h2>
            </div>
            <button className="w3-button" onClick={submitUmfrage}>erstellen</button>
        </Fragment>
    )
}

export default UmfrageErstellen;