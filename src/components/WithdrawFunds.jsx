import React from "react";

const WithdrawFunds = ({ contract }) => {
    const handleWithdraw = async () => {
        if (!contract) return alert("Connect wallet first.");
        if (window.confirm("Are you sure you want to withdraw funds?")) {
            try {
                const tx = await contract.withdrawFunds();
                await tx.wait();
                alert("Funds withdrawn successfully!");
            } catch (error) {
                console.error(error);
                alert("Failed to withdraw funds");
            }
        }
    };


    return (
        <div>
            <h2>Withdraw Funds</h2>
            <button onClick={handleWithdraw}>Withdraw Funds</button>
        </div>
    );
};

export default WithdrawFunds;