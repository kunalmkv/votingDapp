import React, { useState } from "react";

const AnnounceWinner = ({ contract }) => {
    const [winner, setWinner] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAnnounceWinner = async () => {
        setError("");
        setWinner(null);
        setLoading(true);

        if (!contract) {
            setError("Please connect your wallet first.");
            setLoading(false);
            return;
        }

        try {
            const [winnerAddress, votes] = await contract.announceWinner();
            setWinner({ address: winnerAddress, votes: votes.toString() });
        } catch (error) {
            console.error("Transaction failed:", error);
            setError(error.reason ? `❌ ${error.reason}` : "❌ Failed to announce winner. See console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2>Announce Winner</h2>
            <button onClick={handleAnnounceWinner} disabled={loading}>
                {loading ? "Announcing..." : "Announce Winner"}
            </button>
            {error && <div className="alert alert-danger">{error}</div>}
            {winner && (
                <p className="alert alert-success">
                    🏆 Winner: {winner.address} with {winner.votes} votes
                </p>
            )}
        </div>
    );
};

export default AnnounceWinner;