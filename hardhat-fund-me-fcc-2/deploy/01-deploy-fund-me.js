//imports
//main function
//calling of main function
//here will be different we are not going to call main function and declare it

const { isAddress } = require("ethers")
const { getNamedAccounts, network } = require("hardhat")
const { TASK_DEPLOY_RUN_DEPLOY } = require("hardhat-deploy")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const ETHERSCAN_API_KEY = "Z25JKRVS3FJNIQBQ2X5C3ZW7H3E5ICY6S3"
const { verify } = require("../utils/verify")
// const helperConfig =require("../helper-hardhat-config")
// const networkConfig = helperConfig.networkConfig

// async function deployFunc(){
//     console.log("Hi!")
// }

// module.exports.default = deployFunc

// module.exports = async (hre) =>{
//     const {getNamedAccounts, deployments} = hre
// hre.getNamedAccounts
// hre.deployments it is the same
module.exports = async ({ getNamedAccount, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    //if chainId is X use address X
    //if chainId is Y use address Y
    // const ehtUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    let ehtUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    log("----------------------------------------------------")
    log("Deploying FundMe and waiting for confirmations...")

    // if the contract does not exist, we depoloy a minimal version for our local testing
    //well what happens when we want to change chain
    //when going for localhost or hardhat network we want to use a mock
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`FundMe deployed at ${fundMe.address}`)
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        //verify
        await verify(fundMe.address, args)
    }
    log("-------------------------------------------------------------")
}
module.exports.tags = ["all", "fundme"]
