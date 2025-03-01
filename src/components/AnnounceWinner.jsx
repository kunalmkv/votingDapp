import React, { useState, useEffect } from "react";

const AnnounceWinner = ({ contract }) => {
    const [winner, setWinner] = useState(null);

    const handleAnnounceWinner = async () => {
        try {
            const [winnerAddress, votes] = await contract.announceWinner();
            setWinner({ address: winnerAddress, votes: votes.toString() });
        } catch (error) {
            console.error(error);
            alert("Failed to announce winner");
        }
    };

    return (
        <div>
            <h2>Announce Winner</h2>
            <button onClick={handleAnnounceWinner}>Announce Winner</button>
            {winner && (
                <p>
                    Winner: {winner.address} with {winner.votes} votes
                </p>
            )}
        </div>
    );
};

export default AnnounceWinner;