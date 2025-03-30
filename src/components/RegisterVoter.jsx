import React, { useState, useContext } from "react";
import { WalletContext } from "../WalletContext";

const RegisterVoter = () => {
    const { contract, account } = useContext(WalletContext);

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [voterId, setVoterId] = useState("");
    const [gender, setGender] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!contract) {
            setError("Please connect your wallet first.");
            return;
        }

        setLoading(true);
        try {
            const tx = await contract.registerVoter(
                name,
                parseInt(age),
                parseInt(voterId),
                gender
            );
            await tx.wait();
            setSuccess("✅ Voter registered successfully!");

            // Reset form
            setName("");
            setAge("");
            setVoterId("");
            setGender("");
        } catch (error) {
            console.error("Registration failed:", error);
            setError(error.reason ? `❌ ${error.reason}` : "❌ Failed to register voter. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    if (!contract) {
        return <p>Please connect your wallet to register a voter.</p>;
    }

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Voter ID"
                    value={voterId}
                    onChange={(e) => setVoterId(e.target.value)}
                    required
                />
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="0">Male</option>
                    <option value="1">Female</option>
                    <option value="2">Other</option>
                    <option value="3">Not Specified</option>
                </select>

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register as Voter"}
                </button>
            </form>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
        </div>
    );
};

export default RegisterVoter;
