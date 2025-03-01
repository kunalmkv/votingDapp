import { ethers } from "ethers";
import VoteABI from "./contracts/VoteABI.json";

const contractAddress = "0x5A622D76883d70d5fCF079477b1Bf8b873D2b0b6";

export const web3State = async () => {
    if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
    }

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const address = accounts[0];

    const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
    const chainId = parseInt(chainIdHex, 16);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, VoteABI, signer);
    return { contract, address, chainId, provider, signer };
};