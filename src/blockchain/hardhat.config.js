require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
// optional verify plugin
// require("@nomiclabs/hardhat-etherscan");

const { FUJI_RPC, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.28",
  networks: {
    fuji: {
      url: FUJI_RPC || "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 43113
    }
  },
  // etherscan: {
  //   apiKey: { avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY }
  // }
};
