import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const UmfragenVorstellen = (data) => {
    const [umfragen, setUmfragen] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        const response = await axios.get('http://localhost:4000/umfrage/list');
        setUmfragen(response.data);
        }
        fetchData();
    },[]);

    function deleteUmfrage(id) {
        axios.get('http://localhost:4000/umfrage/delete/' + id)
          .catch(err => console.log(err));
    }

    return (
        <Fragment>
        <h1>Ihre Umfragen</h1>
            <table>
            <tbody>
            {umfragen.map(umfrage => (
                    <tr key={umfragen.indexOf(umfrage)}><td><Link to={'/umfrage/list/' + umfrage._id}>{umfrage.name}</Link></td><td><button onClick={e => deleteUmfrage(umfrage._id)}><FontAwesomeIcon icon={faTrash} /></button></td></tr>
            ))}
            </tbody>
            </table>
        </Fragment>
    )
}

export default UmfragenVorstellen;