import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Antwortmeoglichkeiten from '../components/antwortmoeglichkeiten.component';

const DatenEingeben = () => {
    const [fragen, setFragen] = useState([]);

    const { id } = useParams();

    const Optionen = ['ja','nein','vielleicht'];

    useEffect(() => {
        const fetchData = async () => {
        const response = await axios.get('http://localhost:4000/umfrage/list/' + id);
        setFragen(response.data.fragen);
        }
        fetchData();
    },[]);

    function deleteUmfrage(id) {
        axios.get('http://localhost:4000/umfrage/delete/' + id)
          .catch(err => console.log(err));
    }

    function anzahlOptions(e){
        let value = parseInt(e.target.value);
        console.log(value);
    }

    function genOptions () {
        Optionen.map(option => {
            return <td>{'option'}</td>;
        })
    }

    return (
        <Fragment>
        <h1>hier geben Sie Ihre Daten ein</h1>
        <p>ID der Umfrage: {id}</p>
        <label>Anzahl der Antwortmöglichkeiten: </label>
            <select onChange={e => anzahlOptions(e)}>
            <option >2</option>
            <option >3</option>
            <option >4</option>
            <option >5</option>
        </select>
        <p>Fragen:</p>
        <table>
        <tbody>
            {fragen.map(element => {
                return <tr key={fragen.indexOf(element)}><td>{element}</td>{genOptions()}</tr>;
            })}
        </tbody>
        </table>
        <p>Umfrage loeschen <button onClick={e => deleteUmfrage(id)}>click</button></p>
        
        <Antwortmeoglichkeiten id={id}/>
        </Fragment>
    )
}

export default DatenEingeben;