// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
contract ProofOfOwnership {
    struct File {
        address owner;
        string fileHash;
        uint256 timestamp;
    }
    mapping(string => File) public files;
    function registerFile(string memory fileHash) public {
        require(files[fileHash].owner == address(0), "File already exists");
        files[fileHash] = File(msg.sender, fileHash, block.timestamp);
    }
    function getFile(
        string memory fileHash
    ) public view returns (address, uint256) {
        require(files[fileHash].owner != address(0), "File not registered");
        return (files[fileHash].owner, files[fileHash].timestamp);
    }
}
