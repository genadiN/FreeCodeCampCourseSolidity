require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL ||
    "https://eth-sepolia.g.alchemy.com/v2/Q3t0ZJ9w0alBD7SpBi2lDz_R_r_RDwTi"
const PRIVATE_KEY =
    process.env.PRIVATE_KEY || "e1f5359d426e3081ad6124133f9b8108f6fab06522cdaba6f4c3f8bea0c99514"
const COINMARKETCAP_API_KEY =
    process.env.COINMARKETCAP_API_KEY || "72ba2c40-f6ac-42bd-b77f-16d265bcd99d"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "DREV31XIVAT2ACQZM22GPWE5IP9RD76TPR"

module.exports = {
    defaultNtwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            blockConfirmations: 1,
        },
        localhost: {
            chainId: 31337,
        },
        sepolia: {
            chainId: 11155111,
            blockConfirmations: 6,
            url: SEPOLIA_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
        },
    },
    gasReporter: {
        enabled: false,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    },
    solidity: {
        compilers: [
            {
                version: "0.8.7",
            },
            {
                version: "0.4.24",
            },
        ],
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1,
        },
    },
    etherscan: {
        apiKey: {
            sepolia: ETHERSCAN_API_KEY,
        },
    },
    mocha: {
        timeout: 500000, // 500 seconds mack
    },
}
