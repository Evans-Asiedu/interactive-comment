import React, { useState } from 'react';
import './index.css';

const VotingButton = ({ votes = 0, handleDecrement, handleIncrement }) => {
    const [currentVotes, setCurrentVotes] = useState(votes);

    
    return (
        <div className="btn-container">
            <button
                className="button"
                onClick={handleDecrement}
                disabled={currentVotes === 0}
            >
                -
            </button>
            <span className="votes">{currentVotes}</span>
            <button
                className="button"
                onClick={handleIncrement}
            >
                +
            </button>
        </div>
    );
};

export default VotingButton;
