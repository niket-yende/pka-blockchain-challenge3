const Web3 = require('web3');
require('dotenv').config();

// BSC testnet endpoint
const bscNetworkEndpoint = process.env.BSC_TESTNET_ENDPOINT;
console.log(`bscNetworkEndpoint: ${bscNetworkEndpoint}`);
const contractAddress = process.env.CONTRACT_ADDRESS;
console.log(`contractAddress: ${contractAddress}`);
const contractABI = JSON.parse(process.env.CONTRACT_ABI);

const privateKey = process.env.BSC_PRIVATE_KEY;
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

/**
 * Function to check totalSupply before and after mint process.
 */
async function interactWithContract() {
  const web3 = new Web3(bscNetworkEndpoint);
  console.log('Connected to the provider');

  // Set the account using the private key
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account);

  // Create a contract instance
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  // Query the current total supply
  const initialTotalSupply = await contract.methods.totalSupply().call();
  console.log(`Current Total Supply: ${initialTotalSupply}`);

  // Mint new tokens to a specific address
  const recipientAddress = process.env.RECIPIENT_ADDRESS;
  const isValid = web3.utils.isAddress(recipientAddress);
  console.log(`isValid recipient address: ${isValid}`);

  const isZeroAddress = !recipientAddress.localeCompare(ZERO_ADDRESS);
  console.log(`isZeroAddress: ${isZeroAddress}`);

  // Check if the address is invalid or a zero address
  if(!isValid || isZeroAddress) {
    throw new Error('Please provide valid recipient address');
  }

  // Minimum 1 token must be minted
  const mintAmount = process.env.MINT_AMOUNT;
  if(mintAmount < 1) {
    throw new Error('Mint amount must be greater than 0');
  }
  
  const txReceipt = await contract.methods.mint(recipientAddress, mintAmount).send({ from: account.address, gasLimit: '300000', gasPrice: '10000000000' });
  console.log('Tx hash:', txReceipt.transactionHash);
  console.log(`Minted ${mintAmount} tokens to address ${recipientAddress}`);

  // Query the updated total supply
  const updatedTotalSupply = await contract.methods.totalSupply().call();
  console.log('Updated Total Supply:', updatedTotalSupply);

  const deltaTotalSupply = updatedTotalSupply - initialTotalSupply;
  console.log(`deltaTotalSupply: ${deltaTotalSupply}`);
  if(deltaTotalSupply == mintAmount) {
    console.log(`Total supply increased by ${mintAmount} tokens`);
  } else {
    throw new Error('Total supply amount mismatched!');
  }
}

interactWithContract().catch(console.error);
