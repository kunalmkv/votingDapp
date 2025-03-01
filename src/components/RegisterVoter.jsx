import React, { useState } from "react";

const RegisterVoter = ({ contract }) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [voterId, setVoterId] = useState("");
    const [gender, setGender] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await contract.registerVoter(name, parseInt(age), parseInt(voterId), gender);
            alert("Voter registered successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to register voter");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
            <input type="number" placeholder="Voter ID" value={voterId} onChange={(e) => setVoterId(e.target.value)} required />
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Select Gender</option>
                <option value="0">Male</option>
                <option value="1">Female</option>
                <option value="2">Other</option>
                <option value="3">Not Specified</option>
            </select>
            <button type="submit">Register as Voter</button>
        </form>
    );
};

export default RegisterVoter;