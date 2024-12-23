// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
contract ProofOfExistence {
    mapping(bytes32 => uint256) public timestamps;

    function registerDocument(bytes32 documentHash) public {
        require(timestamps[documentHash] == 0, "Document already exists");
        timestamps[documentHash] = block.timestamp;
    }

    function getTimestamp(bytes32 documentHash) public view returns (uint256) {
        require(timestamps[documentHash] != 0, "Document not registered");
        return timestamps[documentHash];
    }
}
