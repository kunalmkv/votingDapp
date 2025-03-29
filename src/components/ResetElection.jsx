import React from "react";

const ResetElection = ({ contract }) => {
    const handleReset = async () => {
        if (!contract) return alert("Please connect your wallet.");
        if (window.confirm("Are you sure you want to reset the election?")) {
            try {
                const tx = await contract.resetElection();
                await tx.wait();
                alert("Election reset successfully!");
            } catch (error) {
                console.error(error);
                alert("Failed to reset election");
            }
        }
    };

    return (
        <div>
            <button onClick={handleReset}>Reset Election</button>
        </div>
    );
};

export default ResetElection;