import React, { useState, useContext } from "react";
import { WalletContext } from "../walletContext";

const SetVotingPeriod = () => {
    const { contract } = useContext(WalletContext);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!contract) {
            alert("Please connect your wallet first.");
            return;
        }

        const start = parseInt(startTime);
        const end = parseInt(endTime);

        if (isNaN(start) || isNaN(end)) {
            alert("Start time and End time must be valid Unix timestamps.");
            return;
        }

        if (start >= end) {
            alert("End time must be greater than start time.");
            return;
        }

        setLoading(true);
        try {
            const tx = await contract.setVotingPeriod(start, end);
            await tx.wait(); // Explicitly await blockchain confirmation
            alert("Voting period set successfully!");

            // Reset fields after success
            setStartTime("");
            setEndTime("");
        } catch (error) {
            console.error("Failed to set voting period:", error);
            alert("Failed to set voting period. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    if (!contract) {
        return <p>Please connect your wallet to set the voting period.</p>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder="Start Time (Unix timestamp)"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="End Time (Unix timestamp)"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? "Setting Voting Period..." : "Set Voting Period"}
            </button>
        </form>
    );
};

export default SetVotingPeriod;
