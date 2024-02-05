# CHALLENGE 3: NODEJS AND BINANCE SMART CHAIN (BSC) INTEGRATION 
## Problem: 
Create a simple NodeJS script that integrates with a BSC Testnet smart contract using
web3.js library. The smart contract's address and ABI will be given to you. Your script should:
1. Query the current total supply of the contract's token.
1. Call a function on the contract that mints a specified amount of tokens to a specific BSC
address.

For the purpose of this test, use the following BSC Testnet BEP20 token contract address:
‘0x0000000000000000000000000000000000000000’. <br/>
Assume the ABI has a function ‘totalSupply()’ for querying the total supply and ‘mint(address
_to, uint256 _amount)’ for minting new tokens.

### Note:
Since the abi was unavailable for the BEP20 token contract. I have used `MyToken.sol` contract as a reference.

## Sample Inputs and Outputs:
### Input: 
1. `getTotalSupply()`
1. `mint("0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B", 1000)`

### Output:
1. `Returns the current total supply of the token.`
1. `Mints 1000 new tokens to the address "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B".`

## Test Case:
1. Run the ‘getTotalSupply()’ function to get the current total supply.
1. Execute the ‘mint()’ function with a valid address and amount.
1. Run the ‘getTotalSupply()’ function again to verify if the total supply has increased by the amount specified in the ‘mint()’ function.

## Libraries used
1. Web3.js - It is a JavaScript library for building on EVM compatible chains that allows you to interact with smart contracts, events, accounts, and more.
1. dotenv - It is used to set the environment variables from `.env` file.

## Usage

### Install node packages

```shell
$ npm install
```

### Set required environment variables

```
CONTRACT_ADDRESS=
CONTRACT_ABI=
BSC_TESTNET_ENDPOINT=
BSC_PRIVATE_KEY=
RECIPIENT_ADDRESS=
MINT_AMOUNT=
```

### Run command

```shell
$ node bscIntegration
```

### Mint transaction details

```shell
https://testnet.bscscan.com/tx/0x09de7ea52e46e2740423a3ea01e44433365535112cd78e88ed215211975c9bdd
```

### Output screenshot
![Screenshot 2024-02-04 163234](https://github.com/niket-yende/pka-blockchain-challenge3/assets/6910493/f138d5cb-a158-4c83-ac1b-d2bdbe40b37c)
