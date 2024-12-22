import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
contract zkEVM {
    using ECDSA for bytes32;
    struct Proof {
        bytes32 proofHash;
        address prover;
        uint256 timestamp;
    }
    mapping(bytes32 => Proof) public proofs;
    function submitProof(bytes32 proofHash) public {
        require(
            proofs[proofHash].prover == address(0),
            "Proof already submitted"
        );
        proofs[proofHash] = Proof(proofHash, msg.sender, block.timestamp);
    }
    function verifyProof(
        bytes32 proofHash
    ) public view returns (address, uint256) {
        require(proofs[proofHash].prover != address(0), "Proof not found");
        return (proofs[proofHash].prover, proofs[proofHash].timestamp);
    }
}
