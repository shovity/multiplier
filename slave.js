const io = require('socket.io-client')

const config = require('./config')

const socket = io(config.socket_uri)

socket.on('order', (handle, data, done) => {
    handle = eval(handle)
    done(handle(data))
})