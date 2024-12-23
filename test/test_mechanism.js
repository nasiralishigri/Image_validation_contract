const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('ProofOfOwnership', function () {
  let ProofOfOwnership;
  let owner;
  let addr1;

  beforeEach(async function () {
    ProofOfOwnership = await ethers.getContractFactory('ProofOfOwnership');
    [owner, addr1] = await ethers.getSigners();
  });

  it('Should register a file and retrieve owner', async function () {
    const fileHash = 'Qm...'; 
    await ProofOfOwnership.connect(owner).registerFile(fileHash);
    const [storedOwner, timestamp] = await ProofOfOwnership.getFile(fileHash);
    expect(storedOwner).to.equal(owner.address); 
  });

  it('Should prevent registering the same file twice', async function () {
    const fileHash = 'Qm...';
    await ProofOfOwnership.connect(owner).registerFile(fileHash);
    await expect(ProofOfOwnership.connect(addr1).registerFile(fileHash))
      .to.be.revertedWith('File already exists');
  });

  // ... Add more test cases for different scenarios ...
});

// Similar test suites for zkEVM and ProofOfExistence contracts