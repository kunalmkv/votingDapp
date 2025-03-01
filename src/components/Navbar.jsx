import React from "react";
import { Link } from "react-router-dom";
import { web3State } from "../contract";

const Navbar = ({ setContract, setAccount }) => {
    const connectWallet = async () => {
        try {
        const {contract, address} = await web3State();
        console.log("✅ Contract Instance:", contract);
        console.log("✅ Selected Account:", address);
        setContract(contract);
        setAccount(address);
            alert("wallet connected successfully");
        } catch (error) {
            console.error(error);
            alert("Failed to connect wallet");
        }
    };

    return (
        <nav style={{ backgroundColor: "#f0f0f0", padding: "10px", marginBottom: "20px" }}>
            <ul style={{ listStyle: "none", display: "flex", gap: "20px" }}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/register-voter">Register Voter</Link></li>
                <li><Link to="/cast-vote">Cast Vote</Link></li>
                <li><Link to="/results">Results</Link></li>
                <li><Link to="/register-candidate">Register Candidate</Link></li>
                <li><Link to="/set-voting-period">Set Voting Period</Link></li>
                <li><Link to="/emergency-stop">Emergency Stop</Link></li>
                <li><Link to="/reset-election">Reset Election</Link></li>
                <li><Link to="/voter-list">Voter List</Link></li>
                <li><Link to="/candidate-list">Candidate List</Link></li>
                <li><Link to="/announce-winner">Announce Winner</Link></li>
                <li><Link to="/voting-status">Voting Status</Link></li>
                <li><Link to="/update-candidate-limit">Update Candidate Limit</Link></li>
                <li><Link to="/withdraw-funds">Withdraw Funds</Link></li>
            </ul>
            <button onClick={connectWallet} style={{ marginLeft: "auto" }}>Connect Wallet</button>
        </nav>
    );
};

export default Navbar;