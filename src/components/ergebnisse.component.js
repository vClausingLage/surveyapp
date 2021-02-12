import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Sector, Cell } from 'recharts';

const Ergebnisse = () => {
    const [ergebnisse, setErgebnisse] = useState([]);
    const [name, setName] = useState();
    const [fragen, setFragen] = useState([]);
    const [submitted, setSubmitted] = useState([]);
    let show = false;

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:4000/umfrage/list/' + id);
            setErgebnisse(response.data.ergebnisse);
            setName(response.data.name);
        }
        fetchData();
    }, [])

    //console.log('ergebnisse:', ergebnisse)
    //console.log('Antworten ', submitted)

    function Answers(){
        let n = ergebnisse.length
        for(let i = 0; i < n; i++) {
            //console.log(ergebnisse[i])
            for (let j = 0; j < 1; j++) {
                console.log(ergebnisse[i][j])
                }
            }
            
        }
    Answers()




    const data = [{ name: 'Group A', value: 1 },{ name: 'Group B', value: 5 },{ name: 'Group C', value: 9 },];

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

    return (
        <Fragment>
        <p>{name}</p>
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