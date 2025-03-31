import React, { useState, useEffect, useContext } from "react";
import { WalletContext } from "../WalletContext";

const VoterList = () => {
    const { contract } = useContext(WalletContext);
    const [voters, setVoters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [voterDetail, setVoterDetail] = useState(null);
    const [detailError, setDetailError] = useState(null);

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
                setError(error.reason ? `❌ ${error.reason}` : "❌ Failed to fetch voters.");
            } finally {
                setLoading(false);
            }
        };

        fetchVoters();
    }, [contract]);

    const fetchVoterDetails = async (voterId) => {
        if (!contract) return;

        try {
            const details = await contract.getVoterDetails(voterId);
            setVoterDetail(details);
            setDetailError(null);
        } catch (error) {
            setDetailError(error.reason ? `❌ ${error.reason}` : "❌ Failed to fetch voter details.");
            setVoterDetail(null);
        }
    };

    return (
        <div className="card shadow-sm p-4">
            <h2 className="text-center mb-4">📋 Voter List</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div className="text-center">Loading voters...</div>}

            {!loading && !error && voters.length === 0 && (
                <p className="text-center">No voters registered yet.</p>
            )}

            {!loading && !error && voters.length > 0 && (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Voted Candidate</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {voters.map((voter, index) => (
                        <tr key={index}>
                            <td>{voter.name}</td>
                            <td>{voter.voterId.toString()}</td>
                            <td>{voter.age.toString()}</td>
                            <td>{voter.gender}</td>
                            <td>{voter.voterAddress}</td>
                            <td>{voter.voterCandidateId}</td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => fetchVoterDetails(voter.voterId)}
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {detailError && <div className="alert alert-danger mt-3">{detailError}</div>}

            {voterDetail && (
                <div className="card mt-4 p-3">
                    <h4 className="text-center">👤 Voter Details</h4>
                    <p><strong>Name:</strong> {voterDetail.name}</p>
                    <p><strong>Age:</strong> {voterDetail.age.toString()}</p>
                    <p><strong>Gender:</strong> {voterDetail.gender}</p>
                    <p><strong>Address:</strong> {voterDetail.voterAddress}</p>
                    <p><strong>Voted Candidate ID:</strong> {voterDetail.voterCandidateId}</p>
                </div>
            )}
        </div>
    );
};

export default VoterList;
