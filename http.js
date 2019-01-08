"use strict";
exports.__esModule = true;
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var zlib = require('zlib');
var net = require('net');
// http
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text-plain' });
    res.end('Hello World\n');
}).listen(8990);
// ===========================
// url
var originalUrl = 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash';
var urlObj = url.parse(originalUrl);
console.log(urlObj);
// .parse: url to obj
// .format: obj config to url
var urlStr = url.format(urlObj);
console.log(urlStr);
// ===========================
// querystring
var qsObj = querystring.parse('name=jack&age=27&hobby=coding&hobby=gaming&');
console.log(qsObj);
var qsStr = querystring.stringify(qsObj);
console.log(qsStr);
// ===========================
// zlib
// useful for reducing the size during data transfer
/*
    zlib.gzip(data, (err, data) => {
        // do things here
    })
*/
http.createServer(function (request, response) {
    var i = 1024, data = '';
    while (i--) {
        data += '.';
    }
    if ((request.headers['accept-encoding'] || '').indexOf('gzip') !== -1) {
        zlib.gzip(data, function (err, data) {
            response.writeHead(200, {
                'Content-Type': 'text/plain',
                'Content-Encoding': 'gzip'
            });
            response.end(data);
        });
    }
    else {
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        response.end(data);
    }
}).listen(90);
// ===========================
// net
// used for creating socket client and socket server
//server
net.createServer(function (connection) {
    connection.on('data', function (data) {
        connection.write([
            'HTTP/1.1 200 OK',
            'Content-Type: text/plain',
            'Content-Length: 11',
            '',
            'Hello World from socket'
        ].join('\n'));
    });
}).listen(80);
// client
var options = {
    port: 80,
    host: 'www.example.com'
};
var client = net.connect(options, function () {
    client.write([
        'GET / HTTP/1.1',
        'User-Agent: curl/7.26.0',
        'Host: www.baidu.com',
        'Accept: */*',
        '',
        ''
    ].join('\n'));
});
client.on('data', function (data) {
    console.log(data.toString());
    client.end();
});
