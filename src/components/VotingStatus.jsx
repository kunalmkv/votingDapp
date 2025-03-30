import React, { useState, useEffect, useContext } from "react";
import { WalletContext } from "../WalletContext";

const VotingStatus = () => {
    const { contract } = useContext(WalletContext);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatus = async () => {
            if (!contract) {
                setError("Please connect your wallet first.");
                return;
            }

            setLoading(true);
            setError(null);

            try {
                let votingStatus = await contract.getVotingStatus();
                votingStatus= Number(votingStatus);
                console.log("votingStatus***", votingStatus);
                setStatus(
                    votingStatus === 0 ? "Not Started" :
                        votingStatus === 1 ? "Started" :
                            "Stopped"
                );
            } catch (error) {
                console.error("Error fetching voting status:", error);
                setError("Failed to fetch voting status. Check console for details.");
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, [contract]);

    if (error) {
        return <p>{error}</p>;
    }

    if (loading) {
        return <p>Loading voting status...</p>;
    }

    if (!contract) {
        return <p>Please connect your wallet to view voting status.</p>;
    }

    return (
        <div>
            <h2>Voting Status</h2>
            <p>Current Status: <strong>{status}</strong></p>
        </div>
    );
};

export default VotingStatus;
