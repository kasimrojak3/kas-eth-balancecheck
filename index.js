require('dotenv').config();
const axios = require('axios');
const chalk = require('chalk');
const readlineSync = require('readline-sync');

const etherscanApiKey = process.env.ETHERSCAN_API_KEY;

async function getWalletBalance(walletAddress) {
    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${etherscanApiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.message === 'OK') {
            const balanceInWei = response.data.result;
            const balanceInEth = axios.get(url).then(response => response.data.result / 1e18);
            console.log(chalk.green(`The balance of the wallet ${walletAddress} is: ${balanceInEth} ETH`));
        } else {
            console.log(chalk.red('There was a problem fetching the wallet balance.'));
        }
    } catch (error) {
        console.error(chalk.red('Failed to fetch data from Etherscan:', error));
    }
}

const walletAddress = readlineSync.question('Enter the Ethereum wallet address: ');
console.log(chalk.yellow(`Fetching balance for ${walletAddress}...`));
getWalletBalance(walletAddress);
