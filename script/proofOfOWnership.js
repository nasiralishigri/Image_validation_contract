const hre = require("hardhat");

async function main() {
  const unlockTime = 1766435403; // Example unlock time

  const ProofOfOWnership = await hre.ethers.getContractFactory("ProofOfOwnership");
  const proofOfOwner= await ProofOfOWnership.deploy();


  console.log("Proof of Ownership deployed to:", proofOfOwner.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});