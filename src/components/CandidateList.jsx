import React, { useState, useEffect } from "react";

const CandidateList = ({ contract }) => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const fetchCandidates = async () => {
            const candidateList = await contract.getCandidateList();
            console.log(candidateList, "candidateList***");
            setCandidates(candidateList);
        };
        fetchCandidates();
    }, [contract]);

    return (
        <div>
            <h2>Candidate List</h2>
            <ul>
                {candidates.map((candidate, index) => (
                    <li key={index}>
                        {candidate.name} (Party: {candidate.party}, Votes: {candidate.voteCount})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CandidateList;