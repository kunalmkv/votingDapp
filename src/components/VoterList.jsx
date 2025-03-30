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
                setVoters(voterList);
            } catch (error) {
                console.error("Error fetching voters:", error);
                setError(error.reason ? `❌ ${error.reason}` : "❌ Failed to fetch voters. Check console for details.");
            } finally {
                setLoading(false);
            }
        };

        fetchVoters();
    }, [contract]);

    return (
        <div className="card">
            <h2>Voter List</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div>Loading voters...</div>}

            {!loading && !error && voters.length === 0 && (
                <p>No voters registered yet.</p>
            )}

            {!loading && !error && voters.length > 0 && (
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
