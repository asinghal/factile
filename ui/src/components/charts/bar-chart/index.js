import React, { useEffect, useRef } from "react";
import * as d3 from 'd3';

import './bar-chart.css';

const XAxis = ({ height, scale, paddingTop }) => {
    const axis = useRef(null);
  
    useEffect(() => {
      d3.select(axis.current).call(d3.axisBottom(scale));
    });
  
    return (
      <g ref={axis} className="axis x" transform={`translate(0, ${height-paddingTop})`} />
    );
  };
  
const YAxis = ({ scale, paddingLeft }) => {
    const axis = useRef(null);

    useEffect(() => {
        d3.select(axis.current).call(d3.axisLeft(scale));
    });

    return (
        <g ref={axis} className="axis y" transform={`translate(${paddingLeft}, 0)`} />
    );
};

const Rect = ({ data, x, y, height }) => {
    return (
        <g transform={`translate(${x(data.name)}, ${y(data.value)})`}>
            <rect width={x.bandwidth()} height={height - y(data.value)} fill="#679b9b" />
            <text transform={`translate(${x.bandwidth() / 2}, ${-2})`}
                textAnchor="middle" alignmentBaseline="baseline" fill="grey" fontSize="8" >{data.value}</text>
        </g>
    );
};
  
export default function BarChart({ ref, data, width = 600 }) {
    if (!data || !data.length) {
        return null;
    }

    const height = 400;
    const paddingTop = 50;
    const paddingLeft = 50;

    const x = d3.scaleBand().range([paddingLeft, width-paddingLeft]).domain(data.map(d => d.name)).padding(0.1);
    const y = d3.scaleLinear().range([height-paddingTop, paddingTop]).domain([0, d3.max(data, d => d.value)]);

    return (
        <svg ref={ref} height={height} width={width}>
            <XAxis scale={x} height={height} paddingTop={paddingTop} />
            <YAxis scale={y} paddingLeft={paddingLeft} />
            <g transform={`translate(0,0)`}>
                {data.map((d, i) => (
                    <Rect data={d} x={x} y={y} height={height-paddingTop} key={i} />
                ))}
            </g>
        </svg>
    );
};
