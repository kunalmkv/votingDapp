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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!contract) {
            alert("Please connect your wallet first!");
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
            await tx.wait(); // explicitly wait for blockchain confirmation
            alert("Candidate registered successfully!");

            // Clear form after successful registration
            setName("");
            setParty("");
            setAge("");
            setGender("");
            setCandidateAddress("");
        } catch (error) {
            console.error("Registration error:", error);
            alert("Failed to register candidate. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    if (!contract) {
        return <p>Please connect your wallet to register a candidate.</p>;
    }

    return (
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
    );
};

export default RegisterCandidate;
