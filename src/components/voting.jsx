import React, { useState } from 'react';

export default function VotingButton() {
    const [votes, setVotes] = useState(0);

    const handleDecreaseVote = () => {
        setVotes((prevVotes) => Math.max(prevVotes - 1, 0)); // Prevent negative votes
    };

    const handleIncreaseVote = () => {
        setVotes((prevVotes) => prevVotes + 1);
    };

    return (
        <div style={styles.btnContainer}>
            <button
                style={styles.button}
                onClick={handleDecreaseVote}
                disabled={votes === 0}
            >
                -
            </button>
            <span style={styles.votes}>{votes}</span>
            <button
                style={styles.button}
                onClick={handleIncreaseVote}
            >
                +
            </button>
        </div>
    );
}

const styles = {
    btnContainer: {
        display: 'flex',
        gap: '0.8rem',
        fontSize: '22px',
        alignItems: 'center',
        border: '1px dotted',
        padding: '5px',
        justifyContent: 'center',
        width:"30%"
    },
    button: {
        border: 'none',
        background: '#007BFF',
        color: 'white',
        fontSize: '20px',
        cursor: 'pointer',
        padding: '5px 10px',
        borderRadius: '5px',
    },
    votes: {
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
        minWidth: '30px',
    },
};
