pragma solidity ^0.4.17;


contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign (uint minimum) public {

        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {

    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        mapping(address=>bool) approvals;
        uint approvalCount;
    }

    Request[] public requests;
    address public manager;
    uint public minimunContribution;
    mapping(address=>bool) public approvers;
    uint approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimun, address creator) public {
        manager = creator;
        minimunContribution = minimun;
    }

    function contribute() public payable {
        require(msg.value > minimunContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient)
        public restricted {

        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount:0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {

        //make sure the person is a contributor
        require(approvers[msg.sender]);

        //to make sure he hasnt already voted
        require(!requests[index].approvals[msg.sender]);

        requests[index].approvals[msg.sender]=true;
        requests[index].approvalCount++;

    }

    function finalizeRequest(uint index) public restricted {

        Request storage request = requests[index];
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;



    }

}
