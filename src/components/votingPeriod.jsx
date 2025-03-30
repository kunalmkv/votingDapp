import React, { useEffect, useState, useContext } from "react";
import { WalletContext } from "../walletContext.jsx";

const VotingPeriod = () => {
    const { contract } = useContext(WalletContext);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVotingPeriod = async () => {
            if (!contract) {
                setError("Please connect your wallet first.");
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const start = await contract.startTime();
                const end = await contract.endTime();
                console.log(start, end, "start and end times");

                // Convert BigInt to Number explicitly
                setStartTime(new Date(Number(start) * 1000));
                setEndTime(new Date(Number(end) * 1000));
            } catch (error) {
                console.error("Error fetching voting period:", error);
                setError("Failed to fetch voting period. Check console for details.");
            } finally {
                setLoading(false);
            }
        };

        fetchVotingPeriod();
    }, [contract]);

    if (error) {
        return <p>{error}</p>;
    }

    if (loading) {
        return <p>Loading voting period...</p>;
    }

    if (!contract) {
        return <p>Please connect your wallet to view the voting period.</p>;
    }

    return (
        <div>
            <h2>🗓️ Voting Period</h2>
            {startTime && endTime ? (
                <div>
                    <p><strong>Start Time:</strong> {startTime.toLocaleString()}</p>
                    <p><strong>End Time:</strong> {endTime.toLocaleString()}</p>
                </div>
            ) : (
                <p>Voting period has not been set yet.</p>
            )}
        </div>
    );
};

export default VotingPeriod;
