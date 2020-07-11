import React from "react";
import * as d3 from 'd3';

import './pie-chart.css';

const getArc = (radius) => d3.arc().innerRadius(0).outerRadius(radius);
const midAngle = (d) => d.startAngle + (d.endAngle - d.startAngle)/2;

const COLORS = [ '#f69e7b', '#f5b0cb', '#679b9b', '#726a95', '#7d5a5a', '#f5b971', '#e36387', '#889e81', '#5d5b6a', '#bd574e', '#39375b', '#445c3c'];

const Slice = ({ pie, radius }) => {
    const arc = getArc(radius);
    const interpolate = d3.interpolateRgb('#f4eeff', '#424874');

    return pie.map((slice, index) => {
        const sliceColor = index < COLORS.length ? COLORS[index] : interpolate(index / (pie.length - 1));
        return <path key={index} d={arc(slice)} fill={sliceColor} />;
    });
};

const Label = ({ pie, labels, radius }) => {
    const labelRadius = 1.5 * radius;
    const arc = getArc(radius);

    return pie.map((slice, index) => {
        const pos = arc.centroid(slice);
        pos[0] = labelRadius * (midAngle(slice) < Math.PI ? 1 : -1);
        pos[1] = 2 * labelRadius * (pos[1]/ 100);
        return <text key={index} dy="-2px" textAnchor="start" transform={`translate(${pos})`} fontSize="0.7em">{labels[index]}</text>;
    });
};

const Line = ({ pie, radius }) => {
    const labelRadius = 1.5 * radius;
    const arc = getArc(radius);

    return pie.map((slice, index) => {
        const labelPos = arc.centroid(slice);
		labelPos[0] = labelRadius * 0.9 * (midAngle(slice) < Math.PI ? 1 : -1);
        labelPos[1] = 2 * labelRadius * (labelPos[1]/ 100);

        const outerArcPos = arc.centroid(slice);
		outerArcPos[0] = labelRadius * 0.5 * (midAngle(slice) < Math.PI ? 1 : -1);
        outerArcPos[1] = 2 * labelRadius * (outerArcPos[1]/ 100);

        return <polyline key={index} points={[arc.centroid(slice), outerArcPos, labelPos]} />;
    });
};

export default function PieChart({ data, width = 600 }) {
    if (!data || !data.length) {
        return null;
    }

    let pie = d3.pie()(data.map(d => d.value));

    const height = 600;
    const radius= Math.min(width, height)/5;

    return (
        <svg height={height} width={width}>
            <g transform={`translate(${width/2}, ${height/2})`}>
                <Slice pie={pie} radius={radius} />
                <Label pie={pie} labels={data.map(d => d.name)} radius={radius} />
                <Line pie={pie} radius={radius} />
            </g>
        </svg>
    );
};
