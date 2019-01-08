const path = require('path');
const fs = require('fs');

// Joining path names
// Most useful if let user type in path name
const joined = path.join('./foo/', '/baz', '../bar.js');
console.log(joined);

// Get extension name
const ext = path.extname(joined);
console.log(ext);

// ============================
function factorial(n: number): number {
    if (n === 1 || n === 1) return 1;
    return n * factorial(n - 1);
}

console.log(factorial(3));
console.log(factorial(10));
console.log(factorial(2));

// ============================
// Remove BOM header of a file
function readText(pathname: String) {
    let bin: Buffer = fs.readFileSync(pathname);
    if (bin[0] === 0xef && bin[1] === 0xbb && bin[2] === 0xbf) {
        bin = bin.slice(3);
    }
    return bin.toString();
}

// console.log(readText('./app.js'));

// When we don't know the encoding used, if we use the same
// binary to encode -> decode, the result would be the same
function replace(pathname: String): void {
    let str: String = fs.readFileSync(pathname, 'binary');
    str = str.replace('foo', 'bar');
    fs.writeFileSync(pathname, str, 'binary');
}

// ============================
