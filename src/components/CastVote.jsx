import React, { useContext, useState, useEffect } from "react";
import { WalletContext } from "../walletContext.jsx";

const CastVote = () => {
    const { contract } = useContext(WalletContext);
    const [candidates, setCandidates] = useState([]);
    const [voterId, setVoterId] = useState("");
    const [candidateId, setCandidateId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchCandidates = async () => {
            if (!contract) {
                setError("Wallet not connected. Please connect your wallet first.");
                return;
            }
            try {
                const candidateList = await contract.getCandidateList();
                setCandidates(candidateList);
            } catch (error) {
                console.error("Error fetching candidates:", error);
                setError(error.reason ? `❌ ${error.reason}` : "❌ Failed to fetch candidates. Check console for details.");
            }
        };
        fetchCandidates();
    }, [contract]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        if (!contract) {
            setError("Wallet not connected. Please connect your wallet first.");
            setLoading(false);
            return;
        }

        try {
            const tx = await contract.castVote(parseInt(voterId), parseInt(candidateId));
            await tx.wait();
            setSuccess("✅ Vote cast successfully!");
        } catch (error) {
            console.error("Transaction failed:", error);
            setError(error.reason ? `❌ ${error.reason}` : "❌ Failed to cast vote. See console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Voter ID"
                    value={voterId}
                    onChange={(e) => setVoterId(e.target.value)}
                    required
                />
                <select
                    value={candidateId}
                    onChange={(e) => setCandidateId(e.target.value)}
                    required
                >
                    <option value="">Select Candidate</option>
                    {candidates.map((candidate) => (
                        <option key={candidate.candidateId} value={candidate.candidateId}>
                            {candidate.name} ({candidate.party})
                        </option>
                    ))}
                </select>
                <button type="submit" disabled={loading}>
                    {loading ? "Casting Vote..." : "Cast Vote"}
                </button>
            </form>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
        </div>
    );
};

export default CastVote;