const Web3 = require('web3');
require('dotenv').config();

// BSC testnet endpoint
const bscNetworkEndpoint = process.env.BSC_TESTNET_ENDPOINT;
console.log(`bscNetworkEndpoint: ${bscNetworkEndpoint}`);
const contractAddress = process.env.CONTRACT_ADDRESS;
console.log(`contractAddress: ${contractAddress}`);
const contractABI = JSON.parse(process.env.CONTRACT_ABI);

const privateKey = process.env.BSC_PRIVATE_KEY;

async function interactWithContract() {
  const web3 = new Web3(bscNetworkEndpoint);
  console.log('Connected to the provider');

  // Set the account using the private key
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account);

  // Create a contract instance
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  // Query the current total supply
  const totalSupply = await contract.methods.totalSupply().call();
  console.log('Current Total Supply:', totalSupply);

  // Mint new tokens to a specific address
  const recipientAddress = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B';
  const mintAmount = 1000;

  const txReceipt = await contract.methods.mint(recipientAddress, mintAmount).send({ from: account.address, gasLimit: '300000', gasPrice: '10000000000' });
  console.log('Tx hash:', txReceipt.transactionHash);
  console.log(`Minted ${mintAmount} tokens to address ${recipientAddress}`);

  // Query the updated total supply
  const updatedTotalSupply = await contract.methods.totalSupply().call();
  console.log('Updated Total Supply:', updatedTotalSupply);
}

interactWithContract().catch(console.error);
