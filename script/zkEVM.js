const hre = require("hardhat");

async function main() {
  const unlockTime = 1766435403; // Example unlock time

  const ZKEVM = await hre.ethers.getContractFactory("zkEVM");
  const zkEVM= await ZKEVM.deploy();


  console.log("zkEVM deployed to:", zkEVM.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});