// in node js
// require()

// in forn-end javascript you can not use require
// import
import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
const balanceButton = document.getElementById("balanceButton")
const withdrawButton = document.getElementById("withdrawButton")
connectButton.onclick = connect
fundButton.onclick = fund
balanceButton.onclick = getBalance
withdrawButton.onclick = withdraw

console.log(ethers)

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
            console.log(error)
        }
        connectButton.innerHTML = "Connected"
        const accounts = await ethereum.request({ method: "eth_accounts" })
        console.log(accounts)
    } else {
        connectButton.innerHTML = "Please install MetaMask"
    }
}

async function getBalance(){
    if(typeof window.ethereum !="undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const balance = await provider.getBalance(contractAddress)
        console.log(ethers.utils.formatEther(balance))
    }
}
//fund function
async function fund(ethAmount) {
    ethAmount = document.getElementById("ethAmount").value
    console.log(`Funding with ${ethAmount}....`)
    if (typeof window.ethereum !== "undefined") {
        //provider / connection to the blockchain
        // signer / wallet / someone with some gas
        // contract that we are interacting with
        // ^ ABI & Address

        // found our http end point
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner() // return Account1 / Account2
        const contract = new ethers.Contract(contractAddress, abi, signer) // how we can go and take our contract ??
        try {
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            })
            //listen for the transaction to be mined
            //listen for an event <- we have not learned about yet
            //hey , wait for this TX to finish
            await listenForTransacionMine(transactionResponse, provider)
        } catch (error) {
            console.log(error)
        }
    }
}

function listenForTransacionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}....`)
    // return new Promise()
    //create a listener for the blockchain
    //listen for this transaction to finish
    return new Promise((resolve, reject) => {
        // we should enter the poriver.once in a return statement in order to know that
        // we first return the statement and then move forward to the next line ofr code
        // We create resolve function which should be called if only the previous 
        // statement ends
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(
                `Completed with ${transactionReceipt.confirmations} confirmations`
            )
            resolve()
        }) // () => {} represent an anonymous function
    })
}

//withdraw function
async function withdraw(){
    console.log("Withdrawing......")
    if(typeof window.ethereum !="undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = provider.getSigner() // return Account1 / Account2
        const contract = new ethers.Contract(contractAddress, abi, signer) // how we can go and take our contract ??
        try{
            const trasnactionResponse = await contract.withdraw()
            await listenForTransacionMine(transactionResponse, provider)
        }catch(error){
            console.log(error)
        }
    } else {
        withdrawButton.innerHTML = "Please install MetaMask"
      }
}
