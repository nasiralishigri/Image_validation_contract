// benchmark/performanceTest.js
const { ethers } = require('hardhat');

const { performance } = require('perf_hooks');
const fs = require('fs');
const { start } = require("repl");

class ConsensusMetrics {
    constructor() {
        this.results = {
            gasUsed: [],
            latency: [],
            transactionCount: 0,
            startTime: 0,
            endTime: 0
        };
    }

    reset() {
        this.results = {
            gasUsed: [],
            latency: [],
            transactionCount: 0,
            startTime: 0,
            endTime: 0
        };
    }
}

async function runBenchmark(contract, operation, iterations, params) {
    const metrics = new ConsensusMetrics();
    metrics.results.startTime = performance.now();
    console.log(`Running ${iterations} iterations of ${operation} ...`);

    for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        const uniqueHex = ethers.hexZeroPad(
            ethers.hexlify(Date.now()), 
            32
        );

        console.log("Generated Hex Value: ", uniqueHex);
        const tx = await contract[operation](uniqueHex);
        const receipt = await tx.wait();
        
        metrics.results.gasUsed.push(Number(receipt.gasUsed));
        metrics.results.latency.push(performance.now() - startTime);
        metrics.results.transactionCount++;
    }

    metrics.results.endTime = performance.now();
    return metrics;
}


async function analyzeBenchmark(metrics) {
    const totalTime = metrics.results.endTime - metrics.results.startTime;
    const avgLatency = metrics.results.latency.reduce((a, b) => a + b, 0) / metrics.results.latency.length;
    const avgGas = metrics.results.gasUsed.reduce((a, b) => a + b, 0) / metrics.results.gasUsed.length;
    const throughput = (metrics.results.transactionCount / totalTime) * 1000; // tx/sec

    return {
        averageLatency: avgLatency.toFixed(2) + " ms",
        averageGasUsed: avgGas.toFixed(2),
        throughput: throughput.toFixed(2) + " tx/sec",
        totalTransactions: metrics.results.transactionCount,
        totalTimeSeconds: (totalTime / 1000).toFixed(2) + " sec"
    };
}

async function main() {
    // Deploy contracts
    const ProofOfOwnership = await ethers.getContractFactory("ProofOfOwnership");
    const ZkEVM = await ethers.getContractFactory("zkEVM");
    const ProofOfExistence = await ethers.getContractFactory("ProofOfExistence");

    const poow = await ProofOfOwnership.deploy();
    const zkEvm = await ZkEVM.deploy();
    const poe = await ProofOfExistence.deploy();
    // Test parameters
    const iterations = 100;
    
    const results = {};
    console.log("Before Hexifying")
    let datanowF = Date.now().toFixed()
    console.log("Date Now: ", datanowF)
    // let hexifyVal = ethers.hexlify(datanowF)
    const hexValue = '0x' + Date.now().toString(16);

console.log("Aftersss")
    
    console.log("Hexify Value: ", hexValue)
    // Test PoOW
    console.log("Testing Proof of Ownership...");
    const poowMetrics = await runBenchmark(
        poow,
        "registerFile",
        iterations,
        hexValue
        // `file${Date.now()}`

        // [`file${Date.now()}`, "test metadata"]
    );
    results.poow = await analyzeBenchmark(poowMetrics);

    // Test zkEVM
    console.log("Testing zkEVM...");
    console.log("Ethers Utils" , ethers.toUtf8Bytes)
    const zkEvmMetrics = await runBenchmark(
        zkEvm,
        "submitProof",
        iterations,
        [
            ethers.keccak256("0x1232"),
            ethers.hexlify(Buffer.from("dummy_proof"))
        ]
        // [
        //     ethers.keccak256(ethers.toUtf8Bytes(`test${Date.now()}`)),
        //     ethers.hexlify(ethers.toUtf8Bytes("dummy_proof"))
        // ]
    );
    results.zkEvm = await analyzeBenchmark(zkEvmMetrics);

    // Test PoE
    console.log("Testing Proof of Existence...");
    const poeMetrics = await runBenchmark(
        poe,
        "registerDocument",
        iterations,
        [
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`doc${Date.now()}`)),
            "test metadata"
        ]
    );
    results.poe = await analyzeBenchmark(poeMetrics);

    // Generate comparison report
    const report = {
        testParameters: {
            iterations,
            network: network.name,
            timestamp: new Date().toISOString()
        },
        results,
        comparison: {
            latency: {
                best: Object.entries(results)
                    .sort((a, b) => parseFloat(a[1].averageLatency) - parseFloat(b[1].averageLatency))[0][0],
                worst: Object.entries(results)
                    .sort((a, b) => parseFloat(b[1].averageLatency) - parseFloat(a[1].averageLatency))[0][0]
            },
            gasEfficiency: {
                best: Object.entries(results)
                    .sort((a, b) => parseFloat(a[1].averageGasUsed) - parseFloat(b[1].averageGasUsed))[0][0],
                worst: Object.entries(results)
                    .sort((a, b) => parseFloat(b[1].averageGasUsed) - parseFloat(a[1].averageGasUsed))[0][0]
            },
            throughput: {
                best: Object.entries(results)
                    .sort((a, b) => parseFloat(b[1].throughput) - parseFloat(a[1].throughput))[0][0],
                worst: Object.entries(results)
                    .sort((a, b) => parseFloat(a[1].throughput) - parseFloat(b[1].throughput))[0][0]
            }
        }
    };

    // Save results to file
    fs.writeFileSync(
        `benchmark-results-${Date.now()}.json`,
        JSON.stringify(report, null, 2)
    );

    console.log("\nBenchmark Results:");
    console.log(JSON.stringify(report, null, 2));
}

// Execute benchmark
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });