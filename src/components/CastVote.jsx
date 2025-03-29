import React, { useContext, useState, useEffect } from "react";
import { WalletContext } from "../walletContext.jsx";

const CastVote = () => {
    const { contract } = useContext(WalletContext);
    const [candidates, setCandidates] = useState([]);
    const [voterId, setVoterId] = useState("");
    const [candidateId, setCandidateId] = useState("");

    useEffect(() => {
        const fetchCandidates = async () => {
            if (!contract) {
                console.error("Contract not loaded");
                alert(`Wallet not connected`);
                return;
            }
            try {
                const candidateList = await contract.getCandidateList();
                setCandidates(candidateList);
            } catch (error) {
                console.error("Error fetching candidates:", error);
            }
        };
        fetchCandidates();
    }, [contract]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!contract) {
            alert("Wallet not connected");
            return;
        }
        try {
            const tx = await contract.castVote(parseInt(voterId), parseInt(candidateId));
            await tx.wait();
            alert("Vote cast successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to cast vote");
        }
    };

    return (
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
            <button type="submit">Cast Vote</button>
        </form>
    );
};

export default CastVote;
