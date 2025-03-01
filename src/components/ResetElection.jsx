import React from "react";

const ResetElection = ({ contract }) => {
    const handleReset = async () => {
        try {
            await contract.resetElection();
            alert("Election reset successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to reset election");
        }
    };

    return (
        <div>
            <button onClick={handleReset}>Reset Election</button>
        </div>
    );
};

export default ResetElection;