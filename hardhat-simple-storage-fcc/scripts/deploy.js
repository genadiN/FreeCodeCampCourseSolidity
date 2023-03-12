// imports
//if it is ether in stead of hardhat it will not recognize the other folder and 
//will make errors. That is why we should use hardhat-ethers.

const {ethers, run, network} = require("hardhat")
const ETHERSCAN_API_KEY = "Z25JKRVS3FJNIQBQ2X5C3ZW7H3E5ICY6S3"

//async main function
async function main(){
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying contract...")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`Deployed contract to: ${simpleStorage.address}`)
  // what happens when we deploy to our hardhat network?
 //what happend when we deploy to our hardhat network? -> it should be verified in etherscan
  //console.log(network.config) <- prints what actually happen in the network
  // 4 == 4 -> true
  // 4 == "4" -> true
  // 4 === "4" -> false
  // if process.en.ETHERSCAN_API_KEY does not exist it will be casted to true or false
  if (network.config.chainId === 5 && ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...")
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  const currentValue = await simpleStorage.retrieve()
  console.log(`Current Value is: ${currentValue}`)

  // Update the current value
  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Updated Value is: ${updatedValue}`)
}

//we are going to build verify function in order to skip the complex process for verification in the TESTNETs wbesites.
// async function verify(contractAddress, args) {
  const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
      await run("verify:verify", {
        address: contractAddress,
        constructorArguments: args,
      })
    } catch (e) {
      if (e.message.toLowerCase().includes("already verified")) {
        console.log("Already Verified!")
      } else {
        console.log(e)
      }
    }
  }

// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })