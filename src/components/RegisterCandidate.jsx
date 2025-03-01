import React, { useState } from "react";

const RegisterCandidate = ({ contract }) => {
    const [name, setName] = useState("");
    const [party, setParty] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [candidateAddress, setCandidateAddress] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await contract.registerCandidate(candidateAddress, name, party, parseInt(age), gender);
            alert("Candidate registered successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to register candidate");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Party" value={party} onChange={(e) => setParty(e.target.value)} required />
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
            <input type="text" placeholder="Candidate Address" value={candidateAddress} onChange={(e) => setCandidateAddress(e.target.value)} required />
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Select Gender</option>
                <option value="0">Male</option>
                <option value="1">Female</option>
                <option value="2">Other</option>
                <option value="3">Not Specified</option>
            </select>
            <button type="submit">Register Candidate</button>
        </form>
    );
};

export default RegisterCandidate;