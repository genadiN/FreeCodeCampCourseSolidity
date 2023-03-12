const {task} =require("hardhat").config

task("block-number", "Prints the current block number").setAction(
    async(taskArgs, hre) => { // define function without declaring function word
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log("Current block number is: ", blockNumber)
    }
    //const blockTask = async function() => {}
    //async function blockTask() {}
    // const verify == async(contractAddress, args) =>{} <==> async function verify (contractAddress, args){}
)