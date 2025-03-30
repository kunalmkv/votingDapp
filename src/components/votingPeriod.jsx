import React, { useEffect, useState, useContext } from "react";
import { WalletContext } from "../walletContext.jsx";

const VotingPeriod = () => {
    const { contract } = useContext(WalletContext);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVotingPeriod = async () => {
            if (!contract) {
                setError("Please connect your wallet first.");
                return;
            }

            setLoading(true);
            setError("");

            try {
                const start = await contract.startTime();
                const end = await contract.endTime();

                setStartTime(new Date(Number(start) * 1000));
                setEndTime(new Date(Number(end) * 1000));
            } catch (error) {
                console.error("Error fetching voting period:", error);
                setError(error.reason ? `❌ ${error.reason}` : "❌ Failed to fetch voting period. Check console for details.");
            } finally {
                setLoading(false);
            }
        };

        fetchVotingPeriod();
    }, [contract]);

    return (
        <div className="card">
            <h2>🗓️ Voting Period</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <p>Loading voting period...</p>}

            {!loading && !error && startTime && endTime ? (
                <div>
                    <p><strong>Start Time:</strong> {startTime.toLocaleString()}</p>
                    <p><strong>End Time:</strong> {endTime.toLocaleString()}</p>
                </div>
            ) : (
                !loading && !error && <p>Voting period has not been set yet.</p>
            )}
        </div>
    );
};

export default VotingPeriod;