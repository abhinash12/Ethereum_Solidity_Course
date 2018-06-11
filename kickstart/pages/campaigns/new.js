import React, {Component} from 'react';
import Layout from '../../components/Layout';
import { Input, Button, Form} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';


class CampaignNew extends Component {
  state = { minimumContribution: ''};

  onSubmit = async (event)=> {
    event.preventDefault();
    const accounts = new web3.eth.getAccounts();
    await factory.methods.createCampaign(this.state.minimunContribution)
    .send({
      from:accounts[0]
    });

  };
  render() {
    return(
      <Layout>
        <h1> New Campaign</h1>
        <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={this.state.minimumContribution}
            onChange={event =>
              this.setState({ minimumContribution: event.target.value })}
          />
        </Form.Field>
          <Button primary>Create</Button>
        </Form>
      </Layout>
    );
  }
}


export default CampaignNew;
