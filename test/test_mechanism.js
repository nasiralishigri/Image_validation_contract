const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('ProofOfOwnership', function () {
    let ProofOfOwnership;
    let proofOfOwnership;
  let owner;
  let addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();

      ProofOfOwnership = await ethers.getContractFactory('ProofOfOwnership');
      proofOfOwnership = await ProofOfOwnership.deploy();
      console.log("Proof of Ownership Address is: ", proofOfOwnership.target)

      console.log("Owner Address is: ", owner.address)
  });

  it('Should register a file and retrieve owner', async function () {
    const fileHash = 'Qm...'; 
    await proofOfOwnership.connect(owner).registerFile(fileHash);
    const [storedOwner, timestamp] = await proofOfOwnership.getFile(fileHash);
    expect(storedOwner).to.equal(owner.address); 
  });

  it('Should prevent registering the same file twice', async function () {
    const fileHash = 'Qm...';
    await proofOfOwnership.connect(owner).registerFile(fileHash);
    await expect(proofOfOwnership.connect(addr1).registerFile(fileHash))
      .to.be.revertedWith('File already exists');
  });

  // ... Add more test cases for different scenarios ...
});

// Similar test suites for zkEVM and ProofOfExistence contracts