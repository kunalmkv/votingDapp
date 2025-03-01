import React, { useState } from "react";
import { Link } from "react-router-dom";
import { web3State } from "../contract";

const Navbar = ({ setContract, setAccount }) => {
    const [darkMode, setDarkMode] = useState(false);

    const connectWallet = async () => {
        try {
            const { contract, address } = await web3State();
            setContract(contract);
            setAccount(address);
            alert("Wallet Connected Successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to connect wallet");
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark-mode");
    };

    return (
        <nav>
            <div className="nav-left">
                <h2>🗳️ Voting DApp</h2>
            </div>
            <ul className="nav-links">
                <li><Link to="/">🏠 Home</Link></li>
                <li><Link to="/register-voter">🗳 Register Voter</Link></li>
                <li><Link to="/register-candidate">🧑‍💼 Register Candidate</Link></li>
                <li><Link to="/cast-vote">🗳 Cast Vote</Link></li>
                <li><Link to="/results">📊 Results</Link></li>
                <li><Link to="/voter-list">📜 Voter List</Link></li>
                <li><Link to="/candidate-list">📜 Candidate List</Link></li>
                <li><Link to="/voting-status">📢 Voting Status</Link></li>
                <li><Link to="/set-voting-period">⏳ Set Voting Period</Link></li>
                <li><Link to="/update-candidate-limit">🔢 Update Candidate Limit</Link></li>
                <li><Link to="/reset-election">🔄 Reset Election</Link></li>
                <li><Link to="/emergency-stop">🚨 Emergency Stop</Link></li>
                <li><Link to="/withdraw-funds">💰 Withdraw Funds</Link></li>
            </ul>
            <div className="nav-right">
                <button onClick={connectWallet}>💳 Connect Wallet</button>
                <span id="dark-mode-toggle" onClick={toggleDarkMode}>
                    {darkMode ? "🌞" : "🌙"}
                </span>
            </div>
        </nav>
    );
};

export default Navbar;
