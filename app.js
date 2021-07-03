const http = require('http')
const express = require('express')

const config = require('./config')


const app = express()
const server = http.createServer(app)

app.use('/static', express.static('static'))


if (config.master) {
    const io = require('./io')
    io.attach(server)

    app.post('/order', (req, res, next) => {

        
    })

    const data = [3, 6]

    const done = (result) => {
        console.log('done', result)
    }

    const handle = (data) => {
        return data.map(a => a**a)
    }

    setTimeout(() => {
        const sockets = [...io.of("/").sockets].map(c => c[1])
        sockets[0].emit('order', handle.toString(), data, done)
    }, 500)
}

server.listen(3000, () => {
    console.log(`Multiplier app running as ${config.master ? 'master' : 'slave'}`)
})

require('./slave')