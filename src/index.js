import React, { useState } from 'react';
import './index.css';

const VotingButton = ({ votes = 0 }) => {
    const [currentVotes, setCurrentVotes] = useState(votes);

    const handleIncrement = () => {
        setCurrentVotes((prevVotes) => prevVotes + 1);
    };

    const handleDecrement = () => {
        setCurrentVotes((prevVotes) => Math.max(prevVotes - 1, 0));
    };

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
