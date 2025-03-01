import React, { useState, useEffect } from "react";

const Results = ({ contract }) => {
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        const fetchWinner = async () => {
            const [winnerAddress, votes] = await contract.announceWinner();
            setWinner({ address: winnerAddress, votes: votes.toString() });
        };
        fetchWinner();
    }, [contract]);

    return (
        <div>
            <h2>Election Results</h2>
            {winner ? (
                <p>
                    Winner: {winner.address} with {winner.votes} votes
                </p>
            ) : (
                <p>No winner announced yet.</p>
            )}
        </div>
    );
};

export default Results;