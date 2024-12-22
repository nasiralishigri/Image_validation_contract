function abc() {
    let name = "ali"
    // console.log(name)
    
    function xyz() {
        console.log(name)
        name = "usman"
        function inner() {
            console.log(name)
        }
        return inner;
    }
    return xyz;
}
const outerf = abc()
let innererr = outerf()
innererr()


