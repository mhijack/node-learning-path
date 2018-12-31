var path = require('path');
var fs = require('fs');
// Joining path names
var joined = path.join('./foo/', '/baz', '../bar.js');
console.log(joined);
// Get extension name
var ext = path.extname(joined);
console.log(ext);
// ============================
function factorial(n) {
    if (n === 1 || n === 1)
        return 1;
    return n * factorial(n - 1);
}
console.log(factorial(3));
console.log(factorial(10));
console.log(factorial(2));
// ============================
// Remove BOM header of a file
function readText(pathname) {
    var bin = fs.readFileSync(pathname);
    if (bin[0] === 0xef && bin[1] === 0xbb && bin[2] === 0xbf) {
        bin = bin.slice(3);
    }
    return bin.toString();
}
// console.log(readText('./app.js'));
// GBK to UTF-8
// ============================
