import React, { useState, useContext } from "react";
import { WalletContext } from "../walletContext";

const SetVotingPeriod = () => {
    const { contract } = useContext(WalletContext);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        if (!contract) {
            setError("Please connect your wallet first.");
            setLoading(false);
            return;
        }

        if (parseInt(startTime) >= parseInt(endTime)) {
            setError("End time must be greater than start time.");
            setLoading(false);
            return;
        }

        try {
            const tx = await contract.setVotingPeriod(parseInt(startTime), parseInt(endTime));
            await tx.wait();
            setSuccess("✅ Voting period set successfully!");
        } catch (error) {
            console.error("Transaction failed:", error);
            setError(error.reason ? `❌ ${error.reason}` : "❌ Transaction failed. See console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
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
                    {loading ? "Setting Period..." : "Set Voting Period"}
                </button>
            </form>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
        </div>
    );
};

export default SetVotingPeriod;
