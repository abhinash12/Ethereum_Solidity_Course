
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
//const { interface, bytecode } = require('./compile');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
	'wife member tuition oyster climb pave load situate region scout roof head',
	'https://rinkeby.infura.io/VgEY5qtpVnXShYD2DL1V'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: '0x' + compiledFactory.bytecode })
    .send({ from: accounts[0] });

	console.log('Contract deployed at', result.options.address);
};
deploy();

//0xe1FF7d1bCEAf911F31852cD23b8C9ccc227ca028
