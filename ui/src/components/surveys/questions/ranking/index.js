import React, { useState } from 'react';

import './ranking.css';

export default function Ranking({ question, persistResponse }) {
    const [ data, setData ] = useState({ data: question.options });

    if (question.qType !== 'ranking') {
        return null;
    }

    let dragged, over;

    const dragStart = function(e) {
        dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = 'move';
        // Firefox requires calling dataTransfer.setData
        // for the drag to properly work
        e.dataTransfer.setData('text/html', e.currentTarget);
    };
    const dragEnd = function(e) {
        dragged.style.display = 'block';
        // Update state
        var d = data.data;
        var from = Number(dragged.dataset.id);
        var to = Number(over.dataset.id);
        if(from < to) to--;
        d.splice(to, 0, d.splice(from, 1)[0]);
        setData({ data: d });
        persistResponse({ answers: d.map(x => x.value) })
    };
    const dragOver = function(e) {
        e.preventDefault();
        dragged.style.display = 'none';
        over = e.target;
    };

    const handleTextChange = (event) => {
        event.persist();
        persistResponse({ other: event.target.value });
    }

    return (
        <div className="ranking">
            <div><i className="fas fa-chevron-circle-right"></i>&nbsp;<strong dangerouslySetInnerHTML={{ __html: question.texts[0].text }}></strong></div>
            <div>
                <ul onDragOver={dragOver}>
                {question.options.map((option, i) => (
                    <li data-id={i} key={question.questionId + "-" + option.value } draggable="true" onDragEnd={dragEnd}
                    onDragStart={dragStart}>{option.texts[0].text}</li>
                ))}
                </ul>

                {question.hasOther &&
                <div className="form-group field" >
                    <div>{question.otherBox[0].text}</div>
                    <div><input type="text" name={question.questionId + "-other"} onChange={handleTextChange} className="form-field"  /></div>
                </div>
                }
            </div>
        </div>
    );
};
