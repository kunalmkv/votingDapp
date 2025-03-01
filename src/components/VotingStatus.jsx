import React, { useState, useEffect } from "react";

const VotingStatus = ({ contract }) => {
    const [status, setStatus] = useState("");

    useEffect(() => {
        const fetchStatus = async () => {
            const votingStatus = await contract.getVotingStatus();
            setStatus(votingStatus === 0 ? "Not Started" : votingStatus === 1 ? "Started" : "Stopped");
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