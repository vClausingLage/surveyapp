import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Cell } from 'recharts';

const Ergebnisse = () => {
    const [ergebnisse, setErgebnisse] = useState([]);
    const [name, setName] = useState();
    const [fragen, setFragen] = useState([]);
    const [optionen, setOptionen] = useState([]);
    const [submitted, setSubmitted] = useState([]);
    const [map, setMap] = useState([]);
    const [data, setData] = useState();

    let show = false;
    const countOccurrences = arr => arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
    
    const { id } = useParams();

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:4000/umfrage/list/' + id);
            setErgebnisse(response.data.ergebnisse);
            setName(response.data.name);
            setFragen(response.data.fragen)
            setOptionen(response.data.optionen)
        }
        fetchData();
    }, [])

    //console.log('ergebnisse:', ergebnisse)
    console.log('Antworten nachher', submitted)
    console.log('map', map)
    console.log('data',data)
    

    function Answers(index){
        let n = ergebnisse.length
        let m = optionen.length
        //console.log('n',n)
        //console.log('fragen',fragen.length)
        for(let i = 0; i < n; i++) {
            //console.log(ergebnisse[i][index].option)
            setSubmitted(submitted => [...submitted, ergebnisse[i][index].option])
        }
    }

    useEffect(() => {
        setMap(map => [...map, countOccurrences(submitted)])
    }, [submitted])

   


    return (
        <Fragment>
        <h1>{name}</h1>
        <p>
            <button onClick={e => Answers(0)}>{fragen[0]}</button>
            <button onClick={e => Answers(1)}>{fragen[1]}</button>
        </p>
        {show && <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        </PieChart>}
        </Fragment>
)}

export default Ergebnisse;
