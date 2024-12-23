const { performance } = require("perf_hooks");
const snarkjs = require("snarkjs");
const path = require("path");

async function generateProof() {
    try {
        const input = {
            "x": "123"
        };

        const wasmPath = path.join(__dirname, "../circuits/circuit_js/circuit.wasm");
        const zkeyPath = path.join(__dirname, "../circuits/circuit_final.zkey");

        console.log("WASM Path:", wasmPath);
        console.log("zKey Path:", zkeyPath);

        const { proof, publicSignals } = await snarkjs.groth16.fullProve(
            input,
            wasmPath,
            zkeyPath
        );

        return { proof, publicSignals };
    } catch (error) {
        console.error("Error generating proof:", error);
        throw error;
    }
}

// ...existing code...

async function runBenchmarkWithSnark() {
    const start = performance.now();

    // Generate zk-proof
    const proofData = await generateProof();

    // Measure time taken
    const end = performance.now();
    console.log(`zk-Proof generation took ${end - start} ms`);

    // Submit proof on-chain
    const tx = await zkEVM.submitProof(proofData.proofHash);
    await tx.wait();

    console.log("Proof submitted successfully!");
}

runBenchmarkWithSnark();
