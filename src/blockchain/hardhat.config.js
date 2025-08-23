require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.17",
  networks: {
    bscTestnet: {
      url: "https://bsc-testnet.publicnode.com",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 97,
    }
  }
};
