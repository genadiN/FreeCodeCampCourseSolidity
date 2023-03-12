import "@nomicfoundation/hardhat-toolbox"
import "dotenv/config"
import "@nomiclabs/hardhat-etherscan"
import "./tasks/block-number"
import "hardhat-gas-reporter"
import "solidity-coverage"
import "@nomiclabs/hardhat-ethers"
import "@typechain/hardhat"
/** @type import('hardhat/config').HardhatUserConfig */



const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL 
|| "https://eth-goerli.g.alchemy.com/v2/Bm4YHrGO56YIIc9hG2AkyzI6iaAeWOri"
const PRIVATE_KEY = process.env.PRIVATE_KEY 
  || "0x638cde5781c7313b6ae209ccdf662dd20a646e1524d6836a94b5126e578e186e" 
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY  || "Z25JKRVS3FJNIQBQ2X5C3ZW7H3E5ICY6S3"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "72ba2c40-f6ac-42bd-b77f-16d265bcd99d"
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
      hardhat: {},
      goerli: {
        url: GOERLI_RPC_URL,
        accounts: [PRIVATE_KEY],
        chainId: 5,
      },
      localhost:{
        url: "http://127.0.0.1:8545/",
        chainId: 31337,
        //acounts -> automatically added from yarn hardhat node
      }
    },
    solidity: "0.8.7",
    etherscan:{
      apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter:{
      enabled: false,
      outputFile: "gas-report.txt",
      noColors: true,
      currency: "USD",
      coinmarketcap: COINMARKETCAP_API_KEY,
      token: "MATIC"
    },
}
