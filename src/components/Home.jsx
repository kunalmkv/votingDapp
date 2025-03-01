import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Voting DApp</h1>
            <nav>
                <ul>
                    <li><Link to="/register-voter">Register Voter</Link></li>
                    <li><Link to="/cast-vote">Cast Vote</Link></li>
      a              <li><Link to="/results">Results</Link></li>
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
            </nav>
        </div>
    );
};

export default Home;