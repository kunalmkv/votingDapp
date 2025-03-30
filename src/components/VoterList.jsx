import React, { useState, useEffect, useContext } from "react";
import { WalletContext } from "../WalletContext";

const VoterList = () => {
    const { contract } = useContext(WalletContext);
    const [voters, setVoters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVoters = async () => {
            if (!contract) {
                setError("Wallet not connected. Please connect your wallet first.");
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const voterList = await contract.getVoterList();
                console.log(voterList, "voters***");
                setVoters(voterList);
            } catch (error) {
                console.error("Error fetching voters:", error);
                setError("Failed to fetch voters. Check console for details.");
            } finally {
                setLoading(false);
            }
        };

        fetchVoters();
    }, [contract]);

    if (error) {
        return <p>{error}</p>;
    }

    if (loading) {
        return <p>Loading voters...</p>;
    }

    if (!contract) {
        return <p>Please connect your wallet to view the voter list.</p>;
    }

    return (
        <div>
            <h2>Voter List</h2>
            {voters.length === 0 ? (
                <p>No voters registered yet.</p>
            ) : (
                <ul>
                    {voters.map((voter, index) => (
                        <li key={index}>
                            {voter.name} (ID: {voter.voterId.toString()}, Age: {voter.age.toString()}, Gender: {voter.gender}, Address: {voter.voterAddress}, Voted Candidate: {voter.votedCandidate})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default VoterList;
