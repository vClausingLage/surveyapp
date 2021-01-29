import React, { useState } from 'react';
import axios from 'axios';

const SchuelerErstellen = () => {
      const [name, setName] = useState('');
      const [nachname, setNachname] = useState('');
      const [klasse, setKlasse] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    const obj = {
      name: name,
      nachname: nachname,
      klasse: klasse
    };
    axios.post('http://localhost:4000/schueler/add', obj)
        .then(res => console.log(res.data));
  }

    return(
        <div className="w3-container w3-margin">
        <div className="w3-container w3-card-2">
            <h3>neue/n Schüler*in hinzufügen</h3>
            <form onSubmit={onSubmit} className="w3-container">
                    <label>Name:  </label>
                    <input type="text"
                      name="name"
                      className="w3-input" 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      />
                    <label>Nachname: </label>
                    <input type="text" 
                      name="nachname"
                      className="w3-input"
                      value={nachname}
                      onChange={e => setNachname(e.target.value)}
                      />
                    <label>Klasse: </label>
                    <input type="text" 
                      name="klasse"
                      className="w3-input"
                      value={klasse}
                      onChange={e => setKlasse(e.target.value)}
                      />
                    <input type="submit" 
                      value="Schüler*in erstellen" 
                      className="w3-button w3-blue w3-round-large w3-hover-white w3-ripple w3-margin-top w3-margin-bottom"/>
            </form>
        </div>
      </div>
    );
}

export default SchuelerErstellen;