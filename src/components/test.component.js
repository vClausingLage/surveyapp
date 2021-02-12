import React, { useEffect, useState, Fragment } from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';

let ergebnisse = [[1,1,2,0],[0,1,2,0],[1,0,2,2]];
let frLength = ergebnisse[0].length;
let optLength = ergebnisse.length;
let antworten = [];
let list = [];

function count (nF, nO, arr) {
    for(let j = 0; j < nF; j++) {
        for(let i = 0; i < nO; i++){
            antworten = [...antworten, arr[i][j]];
        }
    }
    while(antworten.length>0){
        list = [...list, antworten.splice(0,optLength)]
    }
    console.log('fertig: ', list)
}
count(frLength, optLength, ergebnisse)

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

const Example = () => {

    return (
      <Fragment>
      <button >click</button>
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
      </PieChart>
      </Fragment>
    );
  }

export default Example;