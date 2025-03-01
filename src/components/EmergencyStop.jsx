import React from "react";

const EmergencyStop = ({ contract }) => {
    const handleStopVoting = async () => {
        try {
            await contract.emergencyStopVoting();
            alert("Voting stopped successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to stop voting");
        }
    };

    return (
        <div>
            <button onClick={handleStopVoting}>Stop Voting</button>
        </div>
    );
};

export default EmergencyStop;