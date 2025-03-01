import React from "react";

const WithdrawFunds = ({ contract }) => {
    const handleWithdraw = async () => {
        try {
            await contract.withdrawFunds();
            alert("Funds withdrawn successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to withdraw funds");
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