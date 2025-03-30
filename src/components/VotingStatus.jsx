import React, { useState, useEffect, useContext } from "react";
import { WalletContext } from "../WalletContext";

const VotingStatus = () => {
    const { contract } = useContext(WalletContext);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStatus = async () => {
            if (!contract) {
                setError("Please connect your wallet first.");
                return;
            }

            setLoading(true);
            setError("");

            try {
                let votingStatus = await contract.getVotingStatus();
                votingStatus = Number(votingStatus);
                setStatus(
                    votingStatus === 0 ? "Not Started" :
                        votingStatus === 1 ? "Started" :
                            "Stopped"
                );
            } catch (error) {
                console.error("Error fetching voting status:", error);
                setError(error.reason ? `❌ ${error.reason}` : "❌ Failed to fetch voting status. Check console for details.");
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, [contract]);

    return (
        <div className="card">
            <h2>Voting Status</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <p>Loading voting status...</p>}

            {!loading && !error && (
                <p>Current Status: <strong>{status}</strong></p>
            )}
        </div>
    );
};

export default VotingStatus;