import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Ergebnisse = () => {
    const [ergebnisse, setErgebnisse] = useState([]);

    const { id } = useParams();

    console.log(ergebnisse)

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:4000/umfrage/list/' + id);
            setErgebnisse(response.data.ergebnisse);
        }
        fetchData();
    }, [])

    return (
        <Fragment>
            
        </Fragment>
)}

export default Ergebnisse;