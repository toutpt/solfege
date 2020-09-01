import React from 'react';
import './Partition.css';
import { CLAVIER } from '../notes';


const COUNT_NOTES_V = 20;
const COUNT_NOTES_W = 32;
const DIM_NOTES_RADIUS = 5; //circle of the note
const DIM_NOTES_H = 50;
const WIDTH = COUNT_NOTES_W * DIM_NOTES_RADIUS * 4;
const HEIGHT = COUNT_NOTES_V * DIM_NOTES_RADIUS;
const PADDING = 50;

function Note({ trail, cle, diez, color, ...props }) {
    //viewBox={`0 0 ${DIM_NOTES_RADIUS * 2} ${DIM_NOTES_H}`}
    let path;
    if (trail === 'bottom') {
        path = `M ${DIM_NOTES_RADIUS * 2 + 3} ${DIM_NOTES_H - DIM_NOTES_RADIUS} V ${DIM_NOTES_H *1 /3}`;
    } else if (trail === 'top') {
        path = `M 3 ${DIM_NOTES_H - DIM_NOTES_RADIUS} V ${DIM_NOTES_H * 4/3}`;
    }
    return (
        <svg {...props}>
            <ellipse cx={DIM_NOTES_RADIUS + 3} cy={DIM_NOTES_H - DIM_NOTES_RADIUS} rx={DIM_NOTES_RADIUS} ry={DIM_NOTES_RADIUS -1} fill={color} />
            <path d={path} stroke={color}  />
        </svg>
    )
}

function getSolY(n) {
    return HEIGHT - n * DIM_NOTES_RADIUS;
}

function getFaY(n) {
    return PADDING + HEIGHT - n * DIM_NOTES_RADIUS;
}

function Sol({notes, current}) {
    return (
        <g className="Partition__sol">
            <text x="0" y={getSolY(4)}>Sol</text>
            <g>
                <path d={`M 0 ${getSolY(10)} H${WIDTH}`} stroke="black" />
                <path d={`M 0 ${getSolY(8)} H${WIDTH}`} stroke="black" />
                <path d={`M 0 ${getSolY(6)} H${WIDTH}`} stroke="black" />
                <path d={`M 0 ${getSolY(4)} H${WIDTH}`} stroke="black" />
                <path d={`M 0 ${getSolY(2)} H${WIDTH}`} stroke="black" />
            </g>
            {notes.map((n, i) => {
                const outlines = [];
                let trail = 'top';
                const color = current === i ? 'black' : '#666';

                if (n.partitionLine >= 7) { //do
                    trail = 'bottom';
                }
                if (n.partitionLine <= 0) {
                    outlines.push(`M ${41 + i*DIM_NOTES_RADIUS*4} ${getSolY(0)} H ${56 + i*DIM_NOTES_RADIUS*4}`);
                    outlines.push(`M ${41 + i*DIM_NOTES_RADIUS*4} ${getSolY(-2)} H ${56 + i*DIM_NOTES_RADIUS*4}`);
                } else if (n.partitionLine >= 10) {
                    outlines.push(`M ${41 + i*DIM_NOTES_RADIUS*4} ${getSolY(14)} H ${56 + i*DIM_NOTES_RADIUS*4}`);
                    outlines.push(`M ${41 + i*DIM_NOTES_RADIUS*4} ${getSolY(12)} H ${56 + i*DIM_NOTES_RADIUS*4}`);
                    outlines.push(`M ${41 + i*DIM_NOTES_RADIUS*4} ${getSolY(10)} H ${56 + i*DIM_NOTES_RADIUS*4}`);
                }
                return (
                    <React.Fragment key={n.pos}>
                        {outlines.map(l => <path key={l} d={l} stroke={color} />)}
                        <g transform={`translate(${40 + i*DIM_NOTES_RADIUS*4} ${getSolY(n.partitionLine) - DIM_NOTES_H + DIM_NOTES_RADIUS})`}>
                            <Note trail={trail} diez={n.diez} cle="sol" data-pos={n.partitionLine} data-y={getSolY(n.partitionLine)} color={color}/>
                        </g>
                    </React.Fragment>
                );
            })}
        </g>
    );
}

function Fa({notes, current}) {
    return (
        <g className="Partition__fa">
            <text x="0" y={getFaY(-4)}>Fa</text>
            <g>
                <path d={`M 0 ${getFaY(-2)} H${WIDTH}`} stroke="black" />
                <path d={`M 0 ${getFaY(-4)} H${WIDTH}`} stroke="black" />
                <path d={`M 0 ${getFaY(-6)} H${WIDTH}`} stroke="black" />
                <path d={`M 0 ${getFaY(-8)} H${WIDTH}`} stroke="black" />
                <path d={`M 0 ${getFaY(-10)} H${WIDTH}`} stroke="black" />
            </g>
            {notes.map((n, i) => {
                const outlines = [];
                let trail = 'top';
                const color = current === i ? 'black' : '#666';

                if (n.partitionLine >= -6) {
                    trail = 'bottom';
                }
                if (n.partitionLine >= 0) {
                    outlines.push(`M ${41 + i*DIM_NOTES_RADIUS*4} ${getFaY(0)} H ${56 + i*DIM_NOTES_RADIUS*4}`);
                    outlines.push(`M ${41 + i*DIM_NOTES_RADIUS*4} ${getFaY(2)} H ${56 + i*DIM_NOTES_RADIUS*4}`);
                    outlines.push(`M ${41 + i*DIM_NOTES_RADIUS*4} ${getFaY(4)} H ${56 + i*DIM_NOTES_RADIUS*4}`);
                } else if (n.partitionLine <= -12) {
                    outlines.push(`M ${41 + i*DIM_NOTES_RADIUS*4} ${getFaY(-12)} H ${56 + i*DIM_NOTES_RADIUS*4}`);
                    outlines.push(`M ${41 + i*DIM_NOTES_RADIUS*4} ${getFaY(-14)} H ${56 + i*DIM_NOTES_RADIUS*4}`);
                    outlines.push(`M ${41 + i*DIM_NOTES_RADIUS*4} ${getFaY(-16)} H ${56 + i*DIM_NOTES_RADIUS*4}`);
                }
                return (
                    <React.Fragment key={n.pos}>
                        {outlines.map(l => <path key={l} d={l} stroke={color} />)}
                        <g transform={`translate(${40 + i*DIM_NOTES_RADIUS*4} ${getFaY(n.partitionLine) - DIM_NOTES_H + DIM_NOTES_RADIUS})`}>
                            <Note trail={trail} diez={n.diez} cle="fa" data-pos={n.partitionLine} data-y={getFaY(n.partitionLine)} color={color}/>
                        </g>
                    </React.Fragment>
                );
            })}
        </g>
    );
}

export default function Partition(props) {
    const notes = props.notes.map(n => {
        return CLAVIER.find(y => y.pos === n);
    }).filter(n => {
        if (props.cle === 'sol') {
            return n.partitionLine > -5;
        } else if (props.cle === 'fa'){
            return n.partitionLine <= 5;
        }
        return true;
    });
    return (
        <div className="Partition">
            <svg viewBox={`0 0 ${WIDTH} ${2 * HEIGHT + DIM_NOTES_RADIUS + PADDING}`}>
                {(props.cle === 'sol' || !props.cle) && <Sol current={props.current} notes={notes} />}
                {(props.cle === 'fa' || !props.cle) && <Fa current={props.current} notes={notes} />}
            </svg>
        </div>
    );
}