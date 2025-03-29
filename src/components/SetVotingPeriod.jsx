import React, { useState } from "react";

const SetVotingPeriod = ({ contract }) => {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!contract) return alert("Connect wallet first.");
        if (parseInt(startTime) >= parseInt(endTime)) {
            alert("End time must be greater than start time");
            return;
        }
        try {
            const tx = await contract.setVotingPeriod(parseInt(startTime), parseInt(endTime));
            await tx.wait();
            alert("Voting period set successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to set voting period");
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <input type="number" placeholder="Start Time (Unix timestamp)" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
            <input type="number" placeholder="End Time (Unix timestamp)" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
            <button type="submit">Set Voting Period</button>
        </form>
    );
};

export default SetVotingPeriod;