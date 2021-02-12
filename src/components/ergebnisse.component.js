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

    //let frLength = ergebnisse[0].length;
    //let optLength = ergebnisse.length;
    let antworten = [];
    let list = [];

    function count (nF, nO, arr) {
        for(let j = 0; j < nF; j++) {
            for(let i = 0; i < nO; i++){
                antworten = [...antworten, arr[i][j]];
            }
        }
        while(antworten.length>0){
            list = [...list, antworten.splice(0,3)]
        }
    }
    count(frLength, optLength, ergebnisse)

    return (
        <Fragment>
        {ergebnisse.map(item => (
            <p>{item}</p>
        ))}
        {list.map(item => (
            <p>{item}</p>
        ))}
        </Fragment>
)}

export default Ergebnisse;