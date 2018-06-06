const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

const INIT_MESSAGE = 'Hi there';

let accounts;
let inbox;

beforeEach(async () => {
	//get a list of all unlocked accounts
	accounts = await web3.eth.getAccounts();
	
	//use one of the contracts to deploy contracts
	inbox = await new web3.eth.Contract(JSON.parse(interface))
	.deploy({data: bytecode, arguments: ['Hi there'] })
	.send({from: accounts[0], gas: '1000000' });
	
});

describe('Inbox', () => {
	it('deploys contracts', () => {
		assert.ok(inbox.options.address);
	}); 
	
	it('has a default message', async () => {
		const message = await inbox.methods.message().call();
		assert.equal(message, 'Hi there');
	});
	
	it('change message', async () => {
		await inbox.methods.setMessage('Bye').send({ from: accounts[0] });
		const message = await inbox.methods.message().call();
		assert.equal(message, 'Bye');
	});
});