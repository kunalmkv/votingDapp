import React, { useState } from "react";

const EmergencyStop = ({ contract }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleStopVoting = async () => {
        setLoading(true);
        setError("");
        setSuccess("");

        if (!contract) {
            setError("Please connect your wallet first.");
            setLoading(false);
            return;
        }

        try {
            const tx = await contract.emergencyStopVoting();
            await tx.wait();
            setSuccess("✅ Voting stopped successfully!");
        } catch (error) {
            console.error("Transaction failed:", error);
            setError(error.reason ? `❌ ${error.reason}` : "❌ Failed to stop voting. See console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <button onClick={handleStopVoting} disabled={loading}>
                {loading ? "Stopping Voting..." : "Stop Voting"}
            </button>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
        </div>
    );
};

export default EmergencyStop;
