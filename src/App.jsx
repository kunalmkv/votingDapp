import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import RegisterVoter from "./components/RegisterVoter";
import CastVote from "./components/CastVote";
import Results from "./components/Results";
import RegisterCandidate from "./components/RegisterCandidate";
import SetVotingPeriod from "./components/SetVotingPeriod";
import EmergencyStop from "./components/EmergencyStop";
import ResetElection from "./components/ResetElection";
import VoterList from "./components/VoterList";
import CandidateList from "./components/CandidateList";
import AnnounceWinner from "./components/AnnounceWinner";
import VotingStatus from "./components/VotingStatus";
import UpdateCandidateLimit from "./components/UpdateCandidateLimit";
import WithdrawFunds from "./components/WithdrawFunds";

const App = () => {
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState("");

    return (
        <Router>
            <Navbar setContract={setContract} setAccount={setAccount} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register-voter" element={<RegisterVoter contract={contract} />} />
                <Route path="/cast-vote" element={<CastVote contract={contract} />} />
                <Route path="/results" element={<Results contract={contract} />} />
                <Route path="/register-candidate" element={<RegisterCandidate contract={contract} />} />
                <Route path="/set-voting-period" element={<SetVotingPeriod contract={contract} />} />
                <Route path="/emergency-stop" element={<EmergencyStop contract={contract} />} />
                <Route path="/reset-election" element={<ResetElection contract={contract} />} />
                <Route path="/voter-list" element={<VoterList contract={contract} />} />
                <Route path="/candidate-list" element={<CandidateList contract={contract} />} />
                <Route path="/announce-winner" element={<AnnounceWinner contract={contract} />} />
                <Route path="/voting-status" element={<VotingStatus contract={contract} />} />
                <Route path="/update-candidate-limit" element={<UpdateCandidateLimit contract={contract} />} />
                <Route path="/withdraw-funds" element={<WithdrawFunds contract={contract} />} />
            </Routes>
        </Router>
    );
};

export default App;