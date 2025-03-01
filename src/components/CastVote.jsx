import React, { useState, useEffect } from "react";

const CastVote = ({ contract }) => {
    const [candidates, setCandidates] = useState([]);
    const [voterId, setVoterId] = useState("");
    const [candidateId, setCandidateId] = useState("");

    useEffect(() => {
        const fetchCandidates = async () => {
            const candidateList = await contract.getCandidateList();
            console.log(candidateList, "candidateList***");
            setCandidates(candidateList);
        };
        fetchCandidates();
    }, [contract]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await contract.castVote(parseInt(voterId), parseInt(candidateId));
            alert("Vote cast successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to cast vote");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" placeholder="Voter ID" value={voterId} onChange={(e) => setVoterId(e.target.value)} required />
            <select value={candidateId} onChange={(e) => setCandidateId(e.target.value)} required>
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