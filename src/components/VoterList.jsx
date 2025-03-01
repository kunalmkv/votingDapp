import React, { useState, useEffect } from "react";

const VoterList = ({ contract }) => {
    const [voters, setVoters] = useState([]);

    useEffect(() => {
        const fetchVoters = async () => {
            const voterList = await contract.getVoterList();
            setVoters(voterList);
        };
        fetchVoters();
    }, [contract]);

    return (
        <div>
            <h2>Voter List</h2>
            console.log(voters, "voters***);
            <ul>
                {voters.map((voter, index) => (
                    <li key={index}>
                        {voter.name} (ID: {voter.voterId}, Age: {voter.age}, Gender: {voter.gender}, Address: {voter.voterAddress}, VotedCandidate: {voter.votedCandidate})

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VoterList;