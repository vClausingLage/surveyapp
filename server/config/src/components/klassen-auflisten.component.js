import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

const KlassenListe = () => {
    const [klassen, setKlassen] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        const response = await axios.get('http://localhost:4000/klassen/list');
        setKlassen(response.data);
        }
        fetchData();
    },[]);

    return(
        <Fragment>
            <div className="w3-container">
            <table className="">
                {klassen.map(item => (
                    <tr key={klassen.indexOf(item)}>
                    <td><button Link to={'/edit'} className="w3-button w3-white w3-border w3-border-blue w3-round-large">{item}</button></td>
                    </tr>
                ))}
            </table>
            </div>
        </Fragment>
    )
}

export default KlassenListe;