import React, { useState, useEffect } from "react";

const Results = ({ contract }) => {
    const [winner, setWinner] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchWinner = async () => {
            if (!contract) {
                setError("Please connect your wallet first.");
                return;
            }

            setLoading(true);
            setError("");

            try {
                const [winnerAddress, votes] = await contract.announceWinner();
                setWinner({ address: winnerAddress, votes: votes.toString() });
            } catch (error) {
                console.error("Failed to fetch winner:", error);
                setError(error.reason ? `❌ ${error.reason}` : "❌ Failed to fetch winner. Check console for details.");
            } finally {
                setLoading(false);
            }
        };

        fetchWinner();
    }, [contract]);

    return (
        <div className="card">
            <h2>Election Results</h2>
            {loading && <p>Loading results...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && winner ? (
                <p>
                    🏆 Winner: {winner.address} with {winner.votes} votes
                </p>
            ) : (
                !loading && !error && <p>No winner announced yet.</p>
            )}
        </div>
    );
};

export default Results;
