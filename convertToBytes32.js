import { keccak256 } from 'ethereum-cryptography/keccak';

async function main() {
  const inputHash = "0x0171a0f4206c6f8bc1a8b1de4ec2a1107a85f8d8c5748c89cc23a2e1c383400d72";

  // Compute a new hash with keccak256
  const truncatedHash = keccak256(Buffer.from(inputHash.slice(2), "hex"));

  console.log("Rehashed Value (bytes32):", "0x" + Buffer.from(truncatedHash).toString("hex"));
}

main().catch(console.error);
