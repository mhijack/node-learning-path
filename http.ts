import { connect } from 'net';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const zlib = require('zlib');
const net = require('net');

// http
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text-plain' });
    res.end('Hello World\n');
}).listen(8990);

// ===========================
// url
const originalUrl = 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash';

const urlObj: Object = url.parse(originalUrl);
console.log(urlObj);
// .parse: url to obj
// .format: obj config to url
const urlStr: String = url.format(urlObj);
console.log(urlStr);

// ===========================
// querystring
const qsObj: Object = querystring.parse(
    'name=jack&age=27&hobby=coding&hobby=gaming&'
);
console.log(qsObj);
const qsStr: String = querystring.stringify(qsObj);
console.log(qsStr);

// ===========================
// zlib
// useful for reducing the size during data transfer
/* 
    zlib.gzip(data, (err, data) => {
        // do things here
    })
*/
http.createServer(function(request, response) {
    var i = 1024,
        data = '';

    while (i--) {
        data += '.';
    }

    if ((request.headers['accept-encoding'] || '').indexOf('gzip') !== -1) {
        zlib.gzip(data, function(err, data) {
            response.writeHead(200, {
                'Content-Type': 'text/plain',
                'Content-Encoding': 'gzip'
            });
            response.end(data);
        });
    } else {
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
net.createServer(connection => {
    connection.on('data', data => {
        connection.write(
            [
                'HTTP/1.1 200 OK',
                'Content-Type: text/plain',
                'Content-Length: 11',
                '',
                'Hello World from socket'
            ].join('\n')
        );
    });
}).listen(80);

// client
const options: Object = {
    port: 80,
    host: 'www.example.com'
};
const client = net.connect(
    options,
    () => {
        client.write(
            [
                'GET / HTTP/1.1',
                'User-Agent: curl/7.26.0',
                'Host: www.baidu.com',
                'Accept: */*',
                '',
                ''
            ].join('\n')
        );
    }
);
client.on('data', data => {
    console.log(data.toString());
    client.end();
});
