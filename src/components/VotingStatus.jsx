import React, { useState, useEffect } from "react";

const VotingStatus = ({ contract }) => {
    const [status, setStatus] = useState("");

    useEffect(() => {
        const fetchStatus = async () => {
            if (!contract)  alert("Connect wallet first.");
            try {
                const votingStatus = await contract.getVotingStatus();
                setStatus(
                    votingStatus === 0 ? "Not Started" :
                        votingStatus === 1 ? "Started" :
                            "Stopped"
                );
            } catch (error) {
                console.error(error);
            }
        };
        fetchStatus();
    }, [contract]);


    return (
        <div>
            <h2>Voting Status</h2>
            <p>Current Status: {status}</p>
        </div>
    );
};

export default VotingStatus;