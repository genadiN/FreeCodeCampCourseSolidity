require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("@nomicfoundation/hardhat-toolbox")
require("dotenv/config")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("@nomiclabs/hardhat-ethers")
require("@typechain/hardhat")
/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL =
    process.env.GOERLI_RPC_URL ||
    "https://eth-goerli.g.alchemy.com/v2/Bm4YHrGO56YIIc9hG2AkyzI6iaAeWOri"
const SEPHOLIA_RPC_URL =
    process.env.SEPHOLIA_RPC_URL ||
    "https://eth-sepolia.g.alchemy.com/v2/Q3t0ZJ9w0alBD7SpBi2lDz_R_r_RDwTi"
const PRIVATE_KEY =
    process.env.PRIVATE_KEY ||
    "0x638cde5781c7313b6ae209ccdf662dd20a646e1524d6836a94b5126e578e186e"
const ETHERSCAN_API_KEY =
    process.env.ETHERSCAN_API_KEY || "DREV31XIVAT2ACQZM22GPWE5IP9RD76TPR"
const COINMARKETCAP_API_KEY =
    process.env.COINMARKETCAP_API_KEY || "72ba2c40-f6ac-42bd-b77f-16d265bcd99d"
module.exports.default = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6,
        },
        sepholia: {
            url: SEPHOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
            blockConfirmations: 6,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
            //acounts -> automatically added from yarn hardhat node
        },
    },
    // solidity: "0.8.7",
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "ETH",
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    mocha: {
        timeout: 500000,
    },
}
