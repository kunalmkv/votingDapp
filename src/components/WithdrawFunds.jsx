import React, { useState, useContext, useEffect } from "react";
import { WalletContext } from "../WalletContext";

const WithdrawFunds = () => {
    const { contract } = useContext(WalletContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        setError("");
        setSuccess("");
    }, [contract]);

    const handleWithdraw = async () => {
        setError("");
        setSuccess("");

        if (!contract) {
            setError("Please connect your wallet first.");
            return;
        }

        if (window.confirm("Are you sure you want to withdraw funds?")) {
            setLoading(true);

            try {
                const tx = await contract.withdrawFunds();
                await tx.wait();
                setSuccess("✅ Funds withdrawn successfully!");
            } catch (error) {
                console.error("Withdrawal failed:", error);
                setError(error.reason ? `❌ ${error.reason}` : "❌ Failed to withdraw funds. Check console for details.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="card">
            <h2>Withdraw Funds</h2>
            <button onClick={handleWithdraw} disabled={loading || !contract}>
                {loading ? "Withdrawing..." : "Withdraw Funds"}
            </button>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
        </div>
    );
};

export default WithdrawFunds;
