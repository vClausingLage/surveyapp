import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { set } from 'mongoose';
 
const FireUmfrage = (  ) => {
    const [fragen, setFragen] = useState([]);
    const [optionen, setOptionen] = useState([]);
    const [UName, setUName] = useState('');
    const [optionIndex, setOptionIndex] = useState([]);

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

    function setInput(element, index){
        console.log('Option: ' + element + ' Frage: ' + index);
        setOptionIndex(optionIndex => [...optionIndex, {option: element, frage: index}]);
    }

    return (
        <Fragment>
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
                        onChange={e => setInput(element,index)}
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