import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { PieChart, Pie, Cell } from 'recharts'

const Ergebnisse = () => {
    const { id } = useParams()
    const [ergebnisse, setErgebnisse] = useState([])
    const [UName, setUName] = useState('')
    const [fragen, setFragen] = useState()
    const [optionen, setOptionen] = useState([])
    const [optionLength, setOptionLength] = useState()
    const [antworten, setAntworten] = useState({})

    let data = []
    let show = false
    
    //console.log(ergebnisse)
    //console.log(optionen)

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:4000/umfrage/list/' + id)
            setErgebnisse(response.data.ergebnisse)
            setUName(response.data.name)
            setFragen(response.data.fragen)
            setOptionen(response.data.optionen)
            setAntworten()
        }
        fetchData();
    }, [])

    function Frage1 () {
        ergebnisse.forEach(element => {
            console.log(element[0].option)
        })
    }
    Frage1()

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
    };

    return (
        <Fragment>
        <h1>{UName}</h1>
        <p>
            
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