import React, { useState, useContext } from "react";
import { WalletContext } from "../WalletContext";

const RegisterCandidate = () => {
    const { contract } = useContext(WalletContext);
    const [name, setName] = useState("");
    const [party, setParty] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [candidateAddress, setCandidateAddress] = useState("");
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
            const tx = await contract.registerCandidate(
                candidateAddress,
                name,
                party,
                parseInt(age),
                gender
            );
            await tx.wait();
            setSuccess("✅ Candidate registered successfully!");

            // Clear form after successful registration
            setName("");
            setParty("");
            setAge("");
            setGender("");
            setCandidateAddress("");
        } catch (error) {
            console.error("Registration error:", error);
            setError(error.reason ? `❌ ${error.reason}` : "❌ Failed to register candidate. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    if (!contract) {
        return <p>Please connect your wallet to register a candidate.</p>;
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
                    type="text"
                    placeholder="Party"
                    value={party}
                    onChange={(e) => setParty(e.target.value)}
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
                    placeholder="Candidate Address"
                    value={candidateAddress}
                    onChange={(e) => setCandidateAddress(e.target.value)}
                    required
                />
                <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <option value="">Select Gender</option>
                    <option value="0">Male</option>
                    <option value="1">Female</option>
                    <option value="2">Other</option>
                    <option value="3">Not Specified</option>
                </select>
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register Candidate"}
                </button>
            </form>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
        </div>
    );
};

export default RegisterCandidate;