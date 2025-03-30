import React, { useState, useEffect, useContext } from "react";
import { WalletContext } from "../WalletContext";

const CandidateList = () => {
    const { contract } = useContext(WalletContext);
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCandidates = async () => {
            if (!contract) {
                setError("Wallet not connected. Please connect your wallet first.");
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const candidateList = await contract.getCandidateList();
                setCandidates(candidateList);
            } catch (error) {
                console.error("Error fetching candidates:", error);
                setError(error.reason ? `❌ ${error.reason}` : "❌ Failed to fetch candidates. Check the console for details.");
            } finally {
                setLoading(false);
            }
        };

        fetchCandidates();
    }, [contract]);

    return (
        <div className="card">
            <h2>Candidate List</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div>Loading candidates...</div>}

            {!loading && !error && candidates.length === 0 && (
                <p>No candidates registered yet.</p>
            )}

            {!loading && !error && candidates.length > 0 && (
                <ul>
                    {candidates.map((candidate, index) => (
                        <li key={index}>
                            {candidate.name} (id: {candidate.candidateId},Party: {candidate.party}, Votes: {candidate.voteCount.toString()}, Address: {candidate.candidateAddress})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CandidateList;