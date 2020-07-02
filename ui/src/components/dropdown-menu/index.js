import React, { useState } from "react";

import './dropdown-menu.css';

export default function DropdownMenu({ buttonText, options, onSelection }) {
    const [menuDisplayed, setMenuDisplayed] = useState(false);
    const selectOption = (value) => {
        onSelection(value);
        ToggleMenu();
    };

    const ToggleMenu = () => setMenuDisplayed(!menuDisplayed);

    return (
        <div className="button-dropdown">
            <button onClick={ToggleMenu}>{buttonText}</button>
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
