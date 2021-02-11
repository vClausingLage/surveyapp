import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
 
const FireUmfrage = (  ) => {
    const [fragen, setFragen] = useState([]);
    const [optionen, setOptionen] = useState([]);
    const [UName, setUName] = useState('');
    const optionIndex = [];

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

    function submitAll(e){
        e.preventDefault();
        const obj = optionIndex;
        axios.post('http://localhost:4000/umfrage/fire/' + id, obj)
            
    }

    const setInput = (element, index) => {
        optionIndex[index] = element;
    }

    return (
        <Fragment>
        <h3>bitte füllen Sie den Fragebogen aus und senden Sie ihn danach ab</h3>
        <h1>{UName}</h1>
                <div className="container">
                <table>
                <tbody>
                <tr><th>Fragen</th>{optionen.map((item, index) => <th key={index}>{item}</th>)}</tr>
                
                {fragen.map((item, frindex) => <tr key={frindex}><td>{item}</td>
                    {optionen.map((element, index) => <td key={index} className="ankreuzen">
                        <input 
                        type="radio"
                        name={frindex}
                        id={element}
                        onChange={e => setInput(index,frindex)}
                        />
                    </td>)}
                </tr>)}

                </tbody>
                </table>
            </div>
        <button onClick={e => submitAll(e)} style={{margin: 'auto', marginTop: '2rem'}}>absenden</button>
        </Fragment>
    )
}

export default FireUmfrage;