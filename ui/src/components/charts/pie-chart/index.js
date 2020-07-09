import React from "react";
import * as d3 from 'd3';

import './pie-chart.css';

const getArc = () => d3.arc().innerRadius(0).outerRadius(100);
const midAngle = (d) => d.startAngle + (d.endAngle - d.startAngle)/2;

const Slice = ({ pie }) => {
    const arc = getArc();
    const interpolate = d3.interpolateRgb('#f4eeff', '#424874');

    return pie.map((slice, index) => {
        const sliceColor = interpolate(index / (pie.length - 1));
        return <path key={index} d={arc(slice)} fill={sliceColor} />;
    });
};

const Label = ({ pie }) => {
    const radius = 150;
    const arc = getArc();

    return pie.map((slice, index) => {
        const pos = arc.centroid(slice);
        pos[0] = radius * (midAngle(slice) < Math.PI ? 1 : -1);
        pos[1] = 2 * radius * (pos[1]/ 100);
        return <text key={index} textAnchor="middle" transform={`translate(${pos})`}>A</text>;
    });
};

const Line = ({ pie }) => {
    const radius = 150;
    const arc = getArc();

    return pie.map((slice, index) => {
        const labelPos = arc.centroid(slice);
		labelPos[0] = radius * 0.95 * (midAngle(slice) < Math.PI ? 1 : -1);
        labelPos[1] = 2 * radius * (labelPos[1]/ 100);

        const outerArcPos = arc.centroid(slice);
		outerArcPos[0] = radius * 0.5 * (midAngle(slice) < Math.PI ? 1 : -1);
        outerArcPos[1] = 2 * radius * (outerArcPos[1]/ 100);

        return <polyline key={index} points={[arc.centroid(slice), outerArcPos, labelPos]} />;
    });
};

export default function PieChart({ data }) {
    if (!data || !data.length) {
        return null;
    }

    let pie = d3.pie()(data.map(d => d.value));

    const height = 400;
    const width = 400;

    return (
        <svg height={height} width={width}>
            <g transform={`translate(${width/2}, ${height/2})`}>
                <Slice pie={pie} />
                <Label pie={pie} labels={data.map(d => d.name)} />
                <Line pie={pie} />
            </g>
        </svg>
    );
};
