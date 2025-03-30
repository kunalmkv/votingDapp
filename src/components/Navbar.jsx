import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { WalletContext } from "../walletContext.jsx";

const Navbar = () => {
    const { account, connectWallet, disconnectWallet } = useContext(WalletContext);
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark-mode");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    🗳️ Voting DApp
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" to="/">🏠 Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/register-voter">🗳 Register Voter</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/register-candidate">🧑‍💼 Register Candidate</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/cast-vote">🗳 Cast Vote</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/results">📊 Results</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/voter-list">📜 Voter List</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/candidate-list">📜 Candidate List</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/voting-status">📢 Voting Status</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/set-voting-period">⏳ Set Voting Period</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/update-candidate-limit">🔢 Update Candidate Limit</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/reset-election">🔄 Reset Election</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/emergency-stop">🚨 Emergency Stop</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/withdraw-funds">💰 Withdraw Funds</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/get-voting-period">⏰ Get Voting Period</Link></li>
                    </ul>

                    <div className="d-flex align-items-center">
                        {account ? (
                            <>
                                <span className="navbar-text me-2">
                                    Connected: {account.slice(0, 6)}...{account.slice(-4)}
                                </span>
                                <button className="btn btn-sm btn-outline-danger" onClick={disconnectWallet}>
                                    🔌 Disconnect
                                </button>
                            </>
                        ) : (
                            <button className="btn btn-sm btn-outline-success" onClick={connectWallet}>
                                💳 Connect Wallet
                            </button>
                        )}
                        <span id="dark-mode-toggle" className="ms-3" onClick={toggleDarkMode}>
                            {darkMode ? "🌞" : "🌙"}
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
