const io = require('socket.io-client')

const config = require('./config')

const socket = io(config.master)

socket.on('order', (handle, data, done) => {
    try {
        done(eval(handle)(data))
    } catch (e) {
        done(e)
    }
})