import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
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
import VotingPeriod from "./components/VotingPeriod";

const App = () => {
    return (
        <Router>
            <Sidebar />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register-voter" element={<RegisterVoter />} />
                    <Route path="/cast-vote" element={<CastVote />} />
                    <Route path="/results" element={<Results />} />
                    <Route path="/register-candidate" element={<RegisterCandidate />} />
                    <Route path="/set-voting-period" element={<SetVotingPeriod />} />
                    <Route path="/emergency-stop" element={<EmergencyStop />} />
                    <Route path="/reset-election" element={<ResetElection />} />
                    <Route path="/voter-list" element={<VoterList />} />
                    <Route path="/candidate-list" element={<CandidateList />} />
                    <Route path="/announce-winner" element={<AnnounceWinner />} />
                    <Route path="/voting-status" element={<VotingStatus />} />
                    <Route path="/update-candidate-limit" element={<UpdateCandidateLimit />} />
                    <Route path="/withdraw-funds" element={<WithdrawFunds />} />
                    <Route path="/get-voting-period" element={<VotingPeriod />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
