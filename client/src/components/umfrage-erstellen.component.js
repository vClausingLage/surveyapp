import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const UmfrageErstellen = () => {
  const [umfrageName, setUmfrageName] = useState('Titel');
  const [inputFrage, setInputFrage] = useState('Frage');
  const [inputOption, setInputOption] = useState('Antwort');
  const [optionen, setOptionen] = useState([]);
  const [fragen, setFragen] = useState([]);
  const [Matrix, setMatrix] = useState([]);
  const history = useHistory();

  function submitFrage(e) {
    e.preventDefault();
    if (inputFrage.length > 0) {
      setFragen((prevState) => [...prevState, inputFrage]);
      setInputFrage('');
    } else {
      alert('Text eingeben plz');
    }
  }
  function submitOption(e) {
    if (inputOption.length > 0) {
      e.preventDefault();
      setOptionen((prevState) => [...prevState, inputOption]);
      setInputOption('');
    } else {
      alert('Text eingeben plz');
    }
  }

  function addMatrix() {
    let n = fragen.length;
    let m = optionen.length;
    for (let i = 0; i < n; i++) {
      setMatrix((Matrix[i] = Array(m).fill(0)));
    }
  }

  const Redirect = () => {
    let path = '/api/umfragen/list/';
    history.push(path);
  };

  function submitUmfrage(e) {
    e.preventDefault();
    addMatrix();
    const obj = {
      name: umfrageName,
      fragen: fragen,
      optionen: optionen,
      ergebnisse: [Matrix],
    };
    axios.post('/api/create', obj).then((res) => {
      console.log(res.data);
      setFragen([]);
      setOptionen([]);
      Redirect();
    });
  }

  const THead = () => {
    return (
      <tr>
        <th>Frage</th>
        {optionen.map((item) => (
          <th key={optionen.indexOf(item)}>{item}</th>
        ))}
      </tr>
    );
  };

  // const titleBlur = (e) => {
  //   if (umfrageName.length < 1 && umfrageName != 'Titel') {
  //     setUmfrageName((e.target.value = 'Titel'));
  //   } else {
  //     setUmfrageName((e.target.value = ''));
  //   }
  // };

  return (
    <Fragment>
      <div>
        <h1>Umfrage erstellen</h1>
        <div className='grid'>
          <div className='grid-item'>
            <h2>Eingabe</h2>
            <div className='container'>
              <form onSubmit={(e) => e.preventDefault()}>
                <label>Geben Sie Ihrer Umfrage einen Titel: </label>
                <input
                  className='input'
                  type='text'
                  name='umfrageName'
                  value={umfrageName}
                  onChange={(e) => setUmfrageName(e.target.value)}
                  onFocus={() => {
                    if (umfrageName === 'Titel') {
                      setUmfrageName('');
                    }
                  }}
                  onBlur={() => {
                    if (umfrageName === 'Titel' || umfrageName.length == 0) {
                      setUmfrageName('Titel');
                    }
                  }}
                ></input>
              </form>
            </div>
            <div className='container'>
              <form onSubmit={submitOption}>
                <label>Geben Sie die Antwortoptionen ein: </label>
                <input
                  className='input'
                  type='text'
                  name='inputOption'
                  onChange={(e) => setInputOption(e.target.value)}
                  value={inputOption}
                  onFocus={() => {
                    if (inputOption === 'Antwort') {
                      setInputOption('');
                    }
                  }}
                  onBlur={() => {
                    if (inputOption === 'Antwort' || inputOption.length == 0) {
                      setInputOption('Antwort');
                    }
                  }}
                ></input>
              </form>
            </div>
            <div className='container'>
              <p>Fragen erstellen:</p>
              <form onSubmit={submitFrage}>
                <label>Geben Sie Ihre Frage ein: </label>
                <input
                  className='input'
                  type='text'
                  name='inputFrage'
                  onChange={(e) => setInputFrage(e.target.value)}
                  value={inputFrage}
                  onFocus={() => {
                    if (inputFrage === 'Frage') {
                      setInputFrage('');
                    }
                  }}
                  onBlur={() => {
                    if (inputFrage === 'Frage' || inputFrage.length == 0) {
                      setInputFrage('Frage');
                    }
                  }}
                ></input>
              </form>
            </div>
          </div>
          <div className='grid-item'>
            <h2>Vorschau</h2>
            <h1>{umfrageName}</h1>
            <div className='container'>
              <table>
                <tbody>
                  {(fragen.length > 0 || optionen.length > 0) && <THead />}
                  {fragen.map((item) => (
                    <tr key={fragen.indexOf(item)}>
                      <td>
                        {fragen.indexOf(item) + 1}. {item}
                      </td>
                      {optionen.map((item) => (
                        <td
                          key={optionen.indexOf(item) + 7500}
                          className='ankreuzen'
                        >
                          &#10061;
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <button className='submitbutton' onClick={submitUmfrage}>
        erstellen
      </button>
    </Fragment>
  );
};

export default UmfrageErstellen;
