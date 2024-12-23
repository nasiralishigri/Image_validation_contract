const snarkjs = require("snarkjs");
const fs = require("fs");

async function generateProof() {
    // Input data
    const input = { x: 3 };

    // Load circuit and generate proof
    const wasmPath = "./circuit.wasm";
    const zkeyPath = "./circuit_final.zkey";

    const { proof, publicSignals } = await snarkjs.groth16.fullProve(input, wasmPath, zkeyPath);

    console.log("Proof:", proof);
    console.log("Public Signals:", publicSignals);

    // Verify the proof
    const vkey = JSON.parse(fs.readFileSync("./verification_key.json"));
    const verified = await snarkjs.groth16.verify(vkey, publicSignals, proof);

    console.log("Verification Result:", verified);

    return { proof, publicSignals };
}

generateProof();
