const ethers= require("hardhat")
const {expect, assert} = require("chai")

// describe("SimpleStorage", () => {})
describe("SimpleStorage", function () {
  let simpleStorageFactory
  let simpleStorage
  beforeEach(async function () { // function that tell us what to do before each it()
    //before each one of your task we are gonnna declare this two variables
     simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
     simpleStorage = await simpleStorageFactory.deploy()

  })
  //write int it() what the test will do  
  it("Should start with a favorite number of 0", async function() {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"
    //assert key word
    //expect key word
    assert.equal(currentValue.toString(), expectedValue) // it is expected "0" to equal to "0". That is the rule of the test case
    //expect(currentValue.toString()).to.equal(expectedValue) // same as assert statement
  })
  
  it("Should update when we call store", async function () {
    const expectedValue = "7"
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)

    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)

  })
})

