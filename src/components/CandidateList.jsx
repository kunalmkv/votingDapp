import React, { useState, useEffect, useContext } from "react";
import { WalletContext } from "../WalletContext";

const CandidateList = () => {
    const { contract } = useContext(WalletContext);
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
            setError(error.reason ? `❌ ${error.reason}` : "❌ Failed to fetch candidates. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, [contract]);

    const handleGetCandidateDetails = async (candidateId) => {
        try {
            const candidate = await contract.getCandidateDetails(candidateId);
            alert(`Name: ${candidate.name}\nParty: ${candidate.party}\nAge: ${candidate.age}\nGender: ${candidate.gender}\nVotes: ${candidate.voteCount}\nAddress: ${candidate.candidateAddress}`);
        } catch (error) {
            console.error("Error fetching candidate details:", error);
            alert(error.reason ? `❌ ${error.reason}` : "❌ Failed to fetch candidate details.");
        }
    };

    return (
        <div className="card">
            <h2>📜 Candidate List</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div>Loading candidates...</div>}

            {!loading && !error && candidates.length === 0 && (
                <p>No candidates registered yet.</p>
            )}

            {!loading && !error && candidates.length > 0 && (
                <ul>
                    {candidates.map((candidate) => (
                        <li key={candidate.candidateId}>
                            <strong>{candidate.name}</strong> (Party: {candidate.party}, Votes: {candidate.voteCount.toString()}, Address: {candidate.candidateAddress})
                            <button
                                className="btn btn-info btn-sm ms-2"
                                onClick={() => handleGetCandidateDetails(candidate.candidateId)}
                            >
                                🔍 Get Details
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <style jsx>{`
                .card {
                    background: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    max-width: 800px;
                    margin: 30px auto;
                }
                h2 {
                    margin-bottom: 20px;
                    color: #4e54c8;
                }
                ul {
                    list-style: none;
                    padding: 0;
                }
                li {
                    background-color: #f0f4ff;
                    border-radius: 8px;
                    margin-bottom: 10px;
                    padding: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                button {
                    background-color: #4e54c8;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    padding: 5px 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                button:hover {
                    background-color: #3b3f99;
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    );
};

export default CandidateList;
