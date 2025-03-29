import { ethers } from "ethers";
import VoteABI from "./contracts/VoteABI.json";
import axios from "axios";

const contractAddress = "0xD5bF68362f838aA88e960C7C59aE70808a823E4a";
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
    const userNonce= await axios(`http://localhost:3000/user/auth/nonce/${address}`, {
    method: "GET"
});
    console.log(userNonce.data.result.data.nonce, "noiceceee");
const message =`Welcome to voting app . please sign in and authorize. By signing in, you agree to our Terms of Service\n\n This request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n${address}\n\nNonce:\n${userNonce.data.result.data.nonce}`;
const signature = await signer.signMessage(message);

const signatureData = {
    signature: signature, // Correctly assign signature
    address: address,     // Correctly assign address
};

const response = await axios.post(
    "http://localhost:3000/user/auth/validate/signature",
    signatureData,
    {
        headers: {
            "Content-Type": "application/json",
        },
    }
);
const contract = new ethers.Contract(contractAddress, VoteABI, signer);
return { contract, address, chainId, provider, signer };
};