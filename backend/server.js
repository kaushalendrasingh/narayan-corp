"use strict"
const app = require('./app');
const http = require('http');
const debug = require('debug');
const normalizePort = val => {
    var port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}
const onError = err => {
    if (err.syscall !== "listen") throw err;
    const bind = typeof addr === "string" ? 'pipe' + addr : "port" + port;
    switch (err.code) {
        case 'EACCES':
            console.log(bind + "requires elavated privilages")
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.log(bind + "is already in use");
            process.exit(1);
            break;
        default:
            throw err;
    }
};

const onListining = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? 'pipe' + addr : "port" + port;
    debug("Listening on " + bind);
}

const port = normalizePort(process.env.PORT || "3030");

app.set("port", port);

const server = http.createServer(app);

server.on("onError", onError);
server.on('onListining', onListining);
server.listen(port );