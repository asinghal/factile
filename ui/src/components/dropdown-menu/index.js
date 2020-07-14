import React, { useState } from "react";

import './dropdown-menu.css';
import '../forms/buttons.css';


export default function DropdownMenu({ buttonText, options, onSelection }) {
    const [menuDisplayed, setMenuDisplayed] = useState(false);
    const selectOption = (value) => {
        onSelection(value);
        ToggleMenu();
    };

    const ToggleMenu = () => setMenuDisplayed(!menuDisplayed);

    return (
        <div className="button-dropdown">
            <button className="base-btn secondary-btn" onClick={ToggleMenu}>{buttonText}</button>
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
