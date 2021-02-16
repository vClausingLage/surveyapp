import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';

const UmfragenList = () => {
    const [umfragen, setUmfragen] = useState([]);
    const [change, setChange] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        const response = await axios.get('/api/list');
        setUmfragen(response.data);
        }
        fetchData();
    },[change]);

    function deleteUmfrage(id) {
        axios.get('/api/delete/' + id)
            .catch(err => console.log(err));
            const tmp = umfragen.filter( u => u.umfragen !== umfragen );
            setUmfragen(tmp);
            setChange(change + 1);

    }

    return (
        <Fragment>
        <div className="center">
            <h2>Ihre Umfragen</h2>
            <table>
            <tbody>
            {umfragen.map(umfrage => (
                    <tr key={umfragen.indexOf(umfrage)}>
                        <td>{umfrage.name}: </td>
                        <td><Link className="navButton" to={'/umfrage/list/' + umfrage._id}>Umfrage betrachten</Link></td>
                        <td><Link className="navButton" to={'/ergebnisse/' + umfrage._id}>Ergebnisse</Link></td>
                        <td><button onClick={e => deleteUmfrage(umfrage._id)} className="trash icon"><DeleteIcon fontSize="small" /></button></td>
                    </tr>
            ))}
            </tbody>
            </table>
        </div>
        </Fragment>
    )
}

export default UmfragenList;