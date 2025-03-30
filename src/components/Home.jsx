import React, { useContext, useEffect, useState } from "react";
import { WalletContext } from "../WalletContext";

const Home = () => {
    const { contract, account } = useContext(WalletContext);
    const [commissioner, setCommissioner] = useState(null);

    useEffect(() => {
        const fetchCommissioner = async () => {
            if (!contract) return;
            try {
                const commissionerAddress = await contract.electionCommission();
                setCommissioner(commissionerAddress);
            } catch (error) {
                console.error("Failed to fetch commissioner:", error);
            }
        };
        fetchCommissioner();
    }, [contract]);

    const isCommissioner = account && commissioner && account.toLowerCase() === commissioner.toLowerCase();

    return (
        <div className="home-container">
            <h1 className="home-title">🗳️ Welcome to the Voting DApp</h1>

            {account ? (
                isCommissioner ? (
                    <div className="commissioner-section">
                        <h2>👑 Welcome, Election Commissioner!</h2>
                        <p>You have access to the following functionalities:</p>
                        <ul>
                            <li>✅ Register Candidates</li>
                            <li>✅ Set Voting Period</li>
                            <li>✅ Declare Emergency</li>
                            <li>✅ Reset Election</li>
                            <li>✅ Announce Winner</li>
                            <li>✅ Update Candidate Limit</li>
                            <li>✅ Withdraw Funds</li>
                        </ul>
                    </div>
                ) : (
                    <div className="voter-section">
                        <h2>🙋 Welcome, Valued Voter!</h2>
                        <p>You can:</p>
                        <ul>
                            <li>✅ Register as a voter</li>
                            <li>✅ Cast your vote</li>
                            <li>✅ View Election Results</li>
                            <li>✅ Check Voting Status</li>
                        </ul>
                    </div>
                )
            ) : (
                <p className="connect-wallet-msg">Please connect your wallet to proceed.</p>
            )}

            <style jsx>{`
                .home-container {
                    padding: 30px;
                    text-align: center;
                    background-color: #f5f7fa;
                    border-radius: 15px;
                    margin: 40px auto;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                    max-width: 800px;
                }
                .home-title {
                    font-size: 2rem;
                    color: #333;
                }
                .commissioner-section, .voter-section {
                    margin-top: 20px;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                    font-size: 1rem;
                }
                li {
                    margin: 8px 0;
                    padding: 8px;
                    background-color: #e0f0ff;
                    border-radius: 6px;
                    display: inline-block;
                    min-width: 200px;
                }
                .connect-wallet-msg {
                    color: #d9534f;
                    font-size: 1.1rem;
                }
            `}</style>
        </div>
    );
};

export default Home;
