const hre = require("hardhat");

async function main() {
  const unlockTime = 1766435403; // Example unlock time

  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: "1000000" });

  // await lock.deployed();

  console.log("Lock deployed to:", lock.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});