pragma solidity ^0.4.17;
// to show it doesnt work..strings as array in sol
contract TestArray{
    string[] public exArray;
    
    function TestArray() public {
        exArray.push("hello");
    }
    
    function getArray() public view returns (string[]){
        return exArray;
    }
    
}