// WalletContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { web3State } from "./contract";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState("");
    const [loading, setLoading] = useState(true);

    const connectWallet = async () => {
        try {
            const { contract, address } = await web3State();
            setContract(contract);
            setAccount(address);
            localStorage.setItem("walletConnected", "true");
            localStorage.setItem("userAddress", address);
            alert("Wallet Connected Successfully!");
        } catch (error) {
            console.error("Error connecting wallet:", error);
            alert("Failed to connect wallet");
        }
    };

    const disconnectWallet = () => {
        setContract(null);
        setAccount("");
        localStorage.removeItem("walletConnected");
        localStorage.removeItem("userAddress");
        alert("Wallet Disconnected");
    };

    // Auto-connect wallet on reload if previously connected
    useEffect(() => {
        const autoConnectWallet = async () => {
            const previouslyConnected = localStorage.getItem("walletConnected");
            if (previouslyConnected === "true" && window.ethereum) {
                try {
                    const { contract, address } = await web3State();
                    setContract(contract);
                    setAccount(address);
                } catch (error) {
                    console.error("Auto wallet connection failed:", error);
                    disconnectWallet();
                }
            }
            setLoading(false);
        };

        autoConnectWallet();

        // Listen for account changes in MetaMask
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", autoConnectWallet);
            window.ethereum.on("chainChanged", () => window.location.reload());
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener("accountsChanged", autoConnectWallet);
                window.ethereum.removeListener("chainChanged", () => window.location.reload());
            }
        };
    }, []);

    return (
        <WalletContext.Provider value={{ contract, account, connectWallet, disconnectWallet, loading }}>
            {children}
        </WalletContext.Provider>
    );
};
