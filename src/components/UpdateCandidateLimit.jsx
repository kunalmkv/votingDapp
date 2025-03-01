import React, { useState } from "react";

const UpdateCandidateLimit = ({ contract }) => {
    const [limit, setLimit] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await contract.updateCandidateLimit(parseInt(limit));
            alert("Candidate limit updated successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to update candidate limit");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" placeholder="New Candidate Limit" value={limit} onChange={(e) => setLimit(e.target.value)} required />
            <button type="submit">Update Candidate Limit</button>
        </form>
    );
};

export default UpdateCandidateLimit;