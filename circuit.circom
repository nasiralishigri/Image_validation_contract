template HashCheck(signal private input x, signal output hash) {
    signal temp;
    temp <== x * x; // Example computation
    hash <== temp + x; // Output
}

component main = HashCheck();
