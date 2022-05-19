import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Menu from './menu_data.js';

function JuicyLa() {
    return (
        <div>
            <Menu />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<JuicyLa />);