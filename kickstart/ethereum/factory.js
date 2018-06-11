import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xe1FF7d1bCEAf911F31852cD23b8C9ccc227ca028'
);

export default instance;
