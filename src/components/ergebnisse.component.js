import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Ergebnisse = () => {
    const [ergebnisse, setErgebnisse] = useState([]);
    const [frLength, setFrLength] = useState();
    const [optLength, setOptLength] = useState();

    const { id } = useParams();

    console.log(ergebnisse)
    console.log(frLength)
    console.log(optLength)

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:4000/umfrage/list/' + id);
            setErgebnisse(response.data.ergebnisse);
            setFrLength(response.data.fragen.length);
            setOptLength(response.data.optionen.length);
        }
        fetchData();
    }, [])

    //function collectData(){

    //}

    return (
        <Fragment>
        {ergebnisse.map(item => (
            <p>{item}</p>
        ))}
        </Fragment>
)}

export default Ergebnisse;