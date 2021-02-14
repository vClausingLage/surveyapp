import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const UmfragenList = () => {
    const [umfragen, setUmfragen] = useState([]);
    const [change, setChange] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        const response = await axios.get('http://localhost:4000/umfrage/list');
        setUmfragen(response.data);
        }
        fetchData();
    },[change]);

    function deleteUmfrage(id) {
        axios.get('http://localhost:4000/umfrage/delete/' + id)
            .catch(err => console.log(err));
            const tmp = umfragen.filter( u => u.umfragen !== umfragen );
            setUmfragen(tmp);
            setChange(change + 1);

    }

    return (
        <Fragment>
        <div className="center">
            <h1>Ihre Umfragen</h1>
            <table>
            <tbody>
            {umfragen.map(umfrage => (
                    <tr key={umfragen.indexOf(umfrage)}>
                        <td><Link className="navButton" to={'/umfrage/list/' + umfrage._id}>{umfrage.name}</Link></td>
                        <td><Link className="navButton" to={'/ergebnisse/' + umfrage._id}>Ergebnisse</Link></td>
                        <td><button onClick={e => deleteUmfrage(umfrage._id)} className="trash"><FontAwesomeIcon icon={faTrash} /></button></td>
                    </tr>
            ))}
            </tbody>
            </table>
        </div>
        </Fragment>
    )
}

export default UmfragenList;