import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NotenEintragen = () => {
    const [schueler, setSchueler] = useState({
        data:{
        _id:"",
        name:"",
        nachname:"",
        klasse:""
    }});
    const [selectedNoten, setSelectedNoten] = useState(undefined);
{/*const [test, setTest] = useState('');*/}
{/*const [mundlich, setMundlich] = useState('');*/}
{/*const [klausur, setKlausur] = useState('');*/}

    const { id } = useParams();  
    useEffect(() => {
        const fetchData = async () => {
        const response = await axios.get('http://localhost:4000/schueler/edit/'+id);
          setSchueler(response);
        }
        fetchData();
      }, []);


    let Selected = '';
    function selectNoten(value){
        console.log(value);
        setSelectedNoten(value);
        Selected = selectedNoten;
    }

    return(
        <Fragment>
        <div className="w3-container">
            <h1>Noten eintragen</h1>
            <p>Schüler*in: {schueler.data.name} {schueler.data.nachname} (Klasse: {schueler.data.klasse})</p>
            <p>Bitte Art der Note wählen: <select onChange={e => selectNoten(e.target.value)}>
                <option value="Test">Test</option>
                <option value="mundlich">mündlich</option>
                <option value="Klausuren">Klausur</option>
            </select></p>
            <form className="w3-container">
            <label>Note: </label>
            <input className="w3-input" type="text" />
            </form> 
        </div>
        </Fragment>
    );
}

export default NotenEintragen;