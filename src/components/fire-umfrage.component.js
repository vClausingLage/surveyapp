import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
 
const FireUmfrage = (  ) => {
    const [fragen, setFragen] = useState([]);
    const [optionen, setOptionen] = useState([]);
    const [UName, setUName] = useState('');
    const [optionIndex, setOptionIndex] = useState([]);

    let { id } = useParams();

    console.log(optionIndex)

    useEffect(() => {
        const fetchData = async () => {
        const response = await axios.get('http://localhost:4000/umfrage/list/' + id);
        setFragen(response.data.fragen);
        setOptionen(response.data.optionen);
        setUName(response.data.name)
        setOptionIndex(response.data.ergebnisse[0])
        }
        fetchData();
    },[]);

    function submitAll(e){
        e.preventDefault();
        const obj = optionIndex;
        axios.post('http://localhost:4000/umfrage/fire/' + id, obj)
            
    }

    const setInput = (frindex, index) => {
        for (let i =0; i < optionen.length; i++) {
            optionIndex[frindex][i] = 0;
        }
        optionIndex[frindex][index] = (optionIndex[frindex][index] === 0 ? 1 : 0);
    }

    return (
        <Fragment>
        <div className="center">
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
                        onChange={e => setInput(frindex, index)}
                        />
                    </td>)}
                </tr>)}

                </tbody>
                </table>
            </div>
        </div>
        <button onClick={e => submitAll(e)} className="submitbutton">absenden</button>
        </Fragment>
    )
}

export default FireUmfrage;