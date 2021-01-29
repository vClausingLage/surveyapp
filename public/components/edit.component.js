import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {
    const [name, setName] = useState('');
    const [nachname, setNachname] = useState();
    const [gruppe, setGruppe] = useState('');
    const [person, setPerson] = useState({
        data:{
        _id:"",
        name:"",
        nachname:"",
        gruppe:""
    }});

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
        const response = await axios.get('http://localhost:4000/person/edit/'+id);
          setPerson(response);
        }
        fetchData();
      }, []);

    onSubmit(e) {
        e.preventDefault();
        const obj = {
        name: name,
        nachname: nachname,
        gruppe: gruppe
        };
        axios.post('http://localhost:4000/person/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/list');
    }
 
    return (
        <div className="w3-container w3-card-2">
            <h3>Schüler*in bearbeiten</h3>
            <form onSubmit={onSubmit} className="w3-container">
                    <label>Name:  </label>
                    <input 
                    type="text" 
                    className="w3-input" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    <label>Nachname: </label>
                    <input type="text" 
                    className="w3-input"
                    value={nachname}
                    onChange={e => setNachname(e.target.value)}
                    />
                    <label>Klasse: </label>
                    <input type="text" 
                    className="w3-input"
                    value={gruppe}
                    onChange={e => setGruppe(e.target.value)}
                    />
                    <input type="submit" 
                    value="Schüler*in bearbeiten" 
                    className="w3-button w3-blue w3-round-large w3-hover-white w3-ripple w3-margin-top w3-margin-bottom"/>
            </form>
        </div>
    )
}

export default Edit;