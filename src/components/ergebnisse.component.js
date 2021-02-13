import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'

const Ergebnisse = () => {
    const [ergebnisse, setErgebnisse] = useState([])
    const [UName, setUName] = useState('')
    const [optionen, setOptionen] = useState([])
    const [fragen, setFragen] = useState([])
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const { id } = useParams()
  
    //console.log(data)

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:4000/umfrage/list/' + id)
            setErgebnisse(response.data.ergebnisse)
            setUName(response.data.name)
            setOptionen(response.data.optionen)
            setFragen(response.data.fragen)
            setLoading(false)
            ergebnisse.splice(0)
        }
        fetchData();
    }, [])

    function counter(index){
      let count = []
      let sum = []
      let zaehler = 0
      let antwort = []
      let n = optionen.length
      let m = ergebnisse.length
      console.log('Optionen', n, 'Ergebnisse',m)
      //console.log('Index',index)
      for (let i = 0; i < m; i++) {
          count = [...count, ergebnisse[i][index]]
      }
      console.log('count',count)
      for (let j = 0; j < n; j++) {
        for (let k = 0; k < m; k++) {
          zaehler += count[k][j]
        }
        sum = [...sum, zaehler]
        zaehler = 0
      }
      //console.log(sum)
      for (let z = 0; z < n; z++) {
        antwort[z] = {name: `${fragen[z]}`, value: sum[z]}
      }
      setData(antwort)
    }

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

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

    function CustomTooltip({ payload, label, active }) {
      if (active) {
        return (
          <div className="custom-tooltip">
            <p className="label">{`${label} : ${payload[0].value}`}</p>
          </div>
        );
      }
      return null;
    }

    return (
        <Fragment>
        {loading && <p className="centered">loading</p>}
        <div className="grid">
        <div className="grid-item">
        {!loading && <div>
        <h1>{UName}</h1>
        {fragen.map((item, index) =>
          <p key={item}><button onClick={e => counter(index)}>{`${fragen[index]}`}</button></p>
        )}
        </div>}
        </div>
        <div className="grid-item">
        <PieChart width={400} height={400}>
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
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} content={<CustomTooltip  />}/>
        </PieChart>
        </div>
        </div>
        </Fragment>
)}

export default Ergebnisse;