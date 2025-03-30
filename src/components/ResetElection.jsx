import React, { useContext, useState } from "react";
import { WalletContext } from "../WalletContext";

const ResetElection = () => {
    const { contract } = useContext(WalletContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleReset = async () => {
        setError("");
        setSuccess("");

        if (!contract) {
            setError("Please connect your wallet first.");
            return;
        }

        if (window.confirm("Are you sure you want to reset the election?")) {
            setLoading(true);
            try {
                const tx = await contract.resetElection();
                await tx.wait();
                setSuccess("✅ Election reset successfully!");
            } catch (error) {
                console.error("Failed to reset election:", error);
                setError(error.reason ? `❌ ${error.reason}` : "❌ Failed to reset election. Check console for details.");
            } finally {
                setLoading(false);
            }
        }
    };

    if (!contract) {
        return <p>Please connect your wallet to reset the election.</p>;
    }

    return (
        <div className="card">
            <button onClick={handleReset} disabled={loading}>
                {loading ? "Resetting Election..." : "🔄 Reset Election"}
            </button>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
        </div>
    );
};

export default ResetElection;