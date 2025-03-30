import React, { useState } from "react";

const UpdateCandidateLimit = ({ contract }) => {
    const [limit, setLimit] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!contract) {
            setError("Please connect your wallet first.");
            return;
        }

        const newLimit = parseInt(limit);
        if (isNaN(newLimit) || newLimit <= 0) {
            setError("Limit must be greater than 0.");
            return;
        }

        setLoading(true);

        try {
            const tx = await contract.updateCandidateLimit(newLimit);
            await tx.wait();
            setSuccess("✅ Candidate limit updated successfully!");
            setLimit("");
        } catch (error) {
            console.error("Transaction failed:", error);
            setError(error.reason ? `❌ ${error.reason}` : "❌ Failed to update candidate limit. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="New Candidate Limit"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Candidate Limit"}
                </button>
            </form>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
        </div>
    );
};

export default UpdateCandidateLimit;