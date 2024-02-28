/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from 'recharts';

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
  const colors = ['#b1a2f5', '#a2b9f5', '#87d7ed', '#7edeb6', '#deb8f5'];

  useEffect(() => {
    setData(getData())
  },  [`${events}`]);

  const getData = () => {
    const data = genres.map(genre => {
      //for each genre,filter out events to ones including the genre in their .summary key
      const filteredEvents = events.filter(event => event.summary.includes(genre));
      return {
        name: genre,
        value: filteredEvents.length
      }
    });
    //return data array of objects (each genre and # of events about each genre)
    return data;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
    return percent ? (
      <text
        x={x}
        y={y}
        fill="#262626"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}           
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]}/>
          ))}
        </Pie>
        <Legend height={36}/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
