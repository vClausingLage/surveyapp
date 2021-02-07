import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const DatenEingeben = () => {
    const [fragen, setFragen] = useState([]);
    const [optionen, setOptionen] = useState([]);

    const history = useHistory();
    const routeChange = () =>{ 
        let path = '/umfragen/fire/' + id; 
        history.push(path);
    }

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
        const response = await axios.get('http://localhost:4000/umfrage/list/' + id);
        setFragen(response.data.fragen);
        setOptionen(response.data.optionen);
        }
        fetchData();
    },[]);

    function publish(id){
        routeChange();
    }

    return (
        <Fragment>
        <h1>{fragen.name}</h1>
                <div className="container">
                <table>
                <tbody>
                <tr><th>Fragen</th>{optionen.map((item) => <th key={optionen.indexOf(item)}>{item}</th>)}</tr>
                {fragen.map(item => <tr key={fragen.indexOf(item)}><td>{item}</td>{optionen.map(item => <td key={optionen.indexOf(item) + 7500} className="ankreuzen">&#10061;</td>)}</tr>)}
                </tbody>
                </table>
            </div>
        <button onClick={e => publish(id)}>Umfrage veröffentlichen</button>
        
        </Fragment>
    )
}

export default DatenEingeben;