import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const Ergebnisse = () => {
    const [ergebnisse, setErgebnisse] = useState([])
    const [UName, setUName] = useState('')
    const [optionen, setOptionen] = useState([])
    const [fragen, setFragen] = useState([])
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const { id } = useParams()
  
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/list/' + id)
            setErgebnisse(response.data.ergebnisse)
            setUName(response.data.name)
            setOptionen(response.data.optionen)
            setFragen(response.data.fragen)
            setLoading(false)
            ergebnisse.splice(0)
            counter(0)
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
      //console.log('Optionen', n, 'Ergebnisse',m)
      //console.log('Index',index)
      for (let i = 0; i < m; i++) {
          count = [...count, ergebnisse[i][index]]
      }
      //console.log('count',count)
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

    const COLORS = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600']

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
    const radius = 25 + innerRadius + (outerRadius - innerRadius)
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
      x={x}
      y={y}
      fill="#34088e"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {optionen[index]} ({data[index].value})
    </text>
    );
    };

    return (
        <Fragment>
        {loading && <p className="centered">loading</p>}
        <div className="center">
        {!loading &&
        <div>
        <h2>{UName}</h2>
        <h3>klicken Sie auf die Frage, um die Ergebnisse anzuzeigen</h3>
        <div style={{display: 'flex', flexWrap: 'wrap', maxWidth: '90%', justifyContent: 'center'}}>
        {fragen.map((item, index) =>
          <p style={{margin: '.3rem'}} key={item}>
          <button onClick={e => counter(index)}>{`${fragen[index]}`}</button>
          </p>
        )}
        </div>
        </div>
        }
        <ResponsiveContainer width="95%" height={500}>
        <PieChart width={500} height={500}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        </PieChart>
        </ResponsiveContainer>
        </div>
        </Fragment>
)}

export default Ergebnisse;