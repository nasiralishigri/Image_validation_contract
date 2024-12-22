const hre = require("hardhat");

async function main() {
  const unlockTime = 1766435403; // Example unlock time

  const Lock = await hre.ethers.getContractFactory("ProofOfExistence");
  const lock = await Lock.deploy();

  // await lock.deployed();

  console.log("Proof of Existence deployed to:", lock.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});