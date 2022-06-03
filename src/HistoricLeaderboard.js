import React from 'react';
import PropTypes from "prop-types";
import HistoricTable from './Components/HistoricTable';
import './Homepage.css';


const Leaderboard = ({ mealperiod }) => {
    return (
        <>
            <div className='podiumName-lb'><center>
                {mealperiod}</center>
            </div>
            <div className='summary-lb'>
                <HistoricTable period={mealperiod} />
            </div>
        </>
    )

}

Leaderboard.propTypes = {
    mealperiod: PropTypes.string.isRequired
}

export default Leaderboard;