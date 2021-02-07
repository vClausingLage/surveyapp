import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
 
const FireUmfrage = (  ) => {
    const [fragen, setFragen] = useState([]);
    const [optionen, setOptionen] = useState([]);
    const [UName, setUName] = useState('');

    let { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
        const response = await axios.get('http://localhost:4000/umfrage/list/' + id);
        setFragen(response.data.fragen);
        setOptionen(response.data.optionen);
        setUName(response.data.name)
        }
        fetchData();
    },[]);

    function submitAll(){
        console.log()
    }

    return (
        <Fragment>
        <h1>{UName}</h1>
                <div className="container">
                <table>
                <tbody>
                <tr><th>Fragen</th>{optionen.map((item) => <th key={optionen.indexOf(item)}>{item}</th>)}</tr>
                {fragen.map((item, frindex) => <tr key={fragen.indexOf(item) + 100}><td>{item}</td>
                    {optionen.map((element, index) => <td key={index} className="ankreuzen">
                        <input 
                        type="radio"
                        name={frindex}
                        id={element}
                        />
                    </td>)}
                </tr>)}
                </tbody>
                </table>
            </div>
        <button onClick={submitAll}>absenden</button>
        </Fragment>
    )
}

export default FireUmfrage;