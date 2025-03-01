# 🗳️ Blockchain Voting DApp
A **decentralized voting system** built using **Solidity (Ethereum Smart Contract)** and **React** for the frontend. This **secure and transparent** system enables **voter registration, candidate registration, voting, and result announcements** while ensuring fairness and immutability through blockchain technology.

---

## ✨ Features
✔ **Decentralized Voting System** – Fully built on **Ethereum smart contracts**  
✔ **Voter & Candidate Registration** – Users can register as voters or candidates  
✔ **Secure Voting Mechanism** – Prevents double voting and ensures fairness  
✔ **Emergency Stop Feature** – Election commission can halt voting if needed  
✔ **Real-time Election Results** – Announce winner transparently  
✔ **Admin Controls** – Manage candidate limits, reset elections, and withdraw funds  
✔ **MetaMask Integration** – Securely connect and interact with the blockchain

---

## 📂 Project Structure

### **1️⃣ Smart Contract (Solidity)**
The voting system is implemented as an **Ethereum smart contract** (`Vote.sol`), which includes:
- **Voter & Candidate Registration**
- **Voting Mechanism & Result Announcement**
- **Emergency Stop & Election Reset**
- **Security Measures (Access Control, Double Voting Prevention)**

### **2️⃣ Frontend (React & ethers.js)**
The React frontend interacts with the smart contract using **ethers.js**, enabling:
- **MetaMask Wallet Connection**
- **Candidate & Voter Registration Forms**
- **Voting Interface**
- **Admin Controls (Emergency Stop, Reset Election, Announce Winner, Withdraw Funds)**

---

## 🛠️ Installation & Setup

### **1️⃣ Prerequisites**
Ensure you have the following installed before proceeding:
- **Node.js & npm** – [Download](https://nodejs.org/)
- **MetaMask** – [Download](https://metamask.io/)
- **Hardhat** (for local blockchain development)

### **2️⃣ Clone the Repository**
```bash
git clone https://github.com/your-github-username/voting-dapp.git
cd voting-dapp
```

### **3️⃣ Install Dependencies**
```bash

npm install
```

### **4️⃣ Compile & Deploy Smart Contract**


⚙️ How to Use
1️⃣ Connect Wallet
Open the app in your browser.
Click "Connect Wallet" (MetaMask will prompt a connection request).
2️⃣ Register as Voter
Navigate to "Register Voter" page.
Enter Name, Age, Gender, and Voter ID.
Click "Register as Voter".
3️⃣ Register as Candidate
Navigate to "Register Candidate" page.
Enter Name, Party, Age, Gender, and Address.
Click "Register Candidate".
4️⃣ Cast Vote
Go to the "Cast Vote" section.
Select Voter ID and Candidate ID.
Click "Cast Vote".
5️⃣ Check Results
Navigate to "Results" page to view the winner.
6️⃣ Admin Controls
Set Voting Period: Define start and end time.
Emergency Stop: Halt voting in case of fraud or issues.
Reset Election: Clear all data after elections end.
Withdraw Funds: Withdraw any collected fees.
🔒 Security Features
✅ Double Voting Prevention – Ensures each voter can only vote once
✅ Access Control – Admin-only features restricted via smart contract
✅ Immutable Records – Votes stored on the blockchain for transparency
✅ Emergency Stop Function – Admin can halt voting if necessary

🏗️ Future Improvements
🚀 Multi-Election Support – Conduct multiple elections in parallel
🚀 NFT-Based Voting Rights – Token-based voter verification
🚀 Improved UI/UX – Enhanced frontend design and user experience

💡 Technologies Used
Solidity – Smart contract development
React.js – Frontend UI
ethers.js – Blockchain interaction
MetaMask – Wallet connection
Hardhat – Local Ethereum development
