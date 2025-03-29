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
                console.log(candidateList, "candidateList***");
                setCandidates(candidateList);
            } catch (error) {
                console.error("Error fetching candidates:", error);
                setError("Failed to fetch candidates. Check the console for details.");
            } finally {
                setLoading(false);
            }
        };

        fetchCandidates();
    }, [contract]);

    if (error) {
        return <p>{error}</p>;
    }

    if (loading) {
        return <p>Loading candidates...</p>;
    }

    return (
        <div>
            <h2>Candidate List</h2>
            {candidates.length === 0 ? (
                <p>No candidates registered yet.</p>
            ) : (
                <ul>
                    {candidates.map((candidate, index) => (
                        <li key={index}>
                            {candidate.name} (Party: {candidate.party}, Votes: {candidate.voteCount.toString()}, address: {candidate.candidateAddress})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CandidateList;