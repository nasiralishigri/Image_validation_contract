const { CID } = require('multiformats/cid');

const cidString = "bafybeibgpn7hkdg2wl5ellpfhdomysci5wa5avmhxvuekuixgz6an3vcfy00000";
const cid = CID.parse(cidString);

// Get the bytes of the CID
const bytes = cid.bytes;

console.log("CID Bytes:", bytes);

// Convert bytes to a hex string
const hex = '0x' + Buffer.from(bytes).toString('hex');
console.log("Hex:", hex);
