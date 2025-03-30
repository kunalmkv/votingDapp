import React, { useContext, useState } from "react";
import { WalletContext } from "../WalletContext";

const ResetElection = () => {
    const { contract } = useContext(WalletContext);
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        if (!contract) {
            alert("Please connect your wallet first.");
            return;
        }

        if (window.confirm("Are you sure you want to reset the election?")) {
            setLoading(true);
            try {
                const tx = await contract.resetElection();
                await tx.wait(); // explicitly wait for blockchain confirmation
                alert("Election reset successfully!");
            } catch (error) {
                console.error("Failed to reset election:", error);
                alert("Failed to reset election. Check console for details.");
            } finally {
                setLoading(false);
            }
        }
    };

    if (!contract) {
        return <p>Please connect your wallet to reset the election.</p>;
    }

    return (
        <div>
            <button onClick={handleReset} disabled={loading}>
                {loading ? "Resetting Election..." : "🔄 Reset Election"}
            </button>
        </div>
    );
};

export default ResetElection;
