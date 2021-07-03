const socketio = require('socket.io')


const io = socketio()

io.on('connection', async (socket) => {
    console.log(`number of connected slave ${io.engine.clientsCount}`)

    socket.on('disconnect', async () => {
        console.log(`number of connected slave ${io.engine.clientsCount}`)
    })
})


module.exports = io