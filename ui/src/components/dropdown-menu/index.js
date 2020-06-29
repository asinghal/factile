import React, { useState } from "react";

import './dropdown-menu.css';

export default function DropdownMenu({ options, onSelection }) {
    const [menuDisplayed, setMenuDisplayed] = useState(false);
    const selectOption = (value) => {
        onSelection(value);
        ToggleQuestionsMenu();
    };

    const ToggleQuestionsMenu = () => setMenuDisplayed(!menuDisplayed);

    return (
        <div className="button-dropdown">
            <button onClick={ToggleQuestionsMenu}>Add a question</button>
            {menuDisplayed && 
                <div className="button-dropdown-menu">
                    <ul>
                        {options.map((option, index) => 
                            <li onClick={() => selectOption(option.value)} key={option.value + '-' + index}>{option.name}</li>
                        )}
                    </ul>
                </div>
            }
        </div>
    );
}
