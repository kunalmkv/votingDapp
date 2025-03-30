import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { WalletContext } from "../walletContext.jsx";

const Sidebar = () => {
    const { account, connectWallet, disconnectWallet } = useContext(WalletContext);
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark-mode");
    };

    return (
        <div className="sidebar">
            <h2 className="sidebar-title">🗳️ Voting DApp</h2>
            <nav>
                <Link to="/">🏠 Home</Link>
                <Link to="/register-voter">🗳 Register Voter</Link>
                <Link to="/register-candidate">🧑‍💼 Register Candidate</Link>
                <Link to="/cast-vote">🗳 Cast Vote</Link>
                <Link to="/results">📊 Results</Link>
                <Link to="/voter-list">📜 Voter List</Link>
                <Link to="/candidate-list">📜 Candidate List</Link>
                <Link to="/voting-status">📢 Voting Status</Link>
                <Link to="/set-voting-period">⏳ Set Voting Period</Link>
                <Link to="/update-candidate-limit">🔢 Update Candidate Limit</Link>
                <Link to="/reset-election">🔄 Reset Election</Link>
                <Link to="/emergency-stop">🚨 Emergency Stop</Link>
                <Link to="/withdraw-funds">💰 Withdraw Funds</Link>
                <Link to="/get-voting-period">⏰ Get Voting Period</Link>
            </nav>

            <div className="sidebar-footer">
                {account ? (
                    <>
                        <span className="connected-account">
                            Connected: {account.slice(0, 6)}...{account.slice(-4)}
                        </span>
                        <button className="disconnect-btn" onClick={disconnectWallet}>
                            🔌 Disconnect
                        </button>
                    </>
                ) : (
                    <button className="connect-btn" onClick={connectWallet}>
                        💳 Connect Wallet
                    </button>
                )}
                <button className="theme-toggle" onClick={toggleDarkMode}>
                    {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
