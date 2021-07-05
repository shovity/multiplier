const http = require('http')
const express = require('express')

const config = require('./config')


const app = express()
const server = http.createServer(app)

app.use('/static', express.static('static'))
app.use(express.json())


if (!config.master) {
    const io = require('./io')
    io.attach(server)

    const work = (inputs, handle, done) => {
        const sockets = [...io.of("/").sockets].map(c => c[1])
        const freeSockets = sockets.filter(s => !s.busy)

        const splitLevel = Math.min(
            Math.ceil(inputs.length / freeSockets.length),
            inputs.length,
        )

        const chucks = []
            
        for (let i = 0; i < inputs.length; i += splitLevel) {
            chucks.push(inputs.slice(i, i + splitLevel))
        }

        const promises = chucks.map((c, index) => {
            return new Promise((resolve, reject) => {
                freeSockets[index].emit('order', handle.toString(), c, (result) => {
                    resolve(result)
                })
            })
        })

        Promise.all(promises).then((resultSegments) => {
            const results = resultSegments.reduce((pre, cur) => pre.concat(cur), [])
            done(results)
        })
    }

    app.post('/order', (req, res, next) => {
        const handle = req.body.handle
        const inputs = req.body.inputs

        work(inputs, handle, (results) => {
            res.json({
                results,
            })
        })
    })
}

server.listen(3000, () => {
    console.log(`Multiplier app running as ${config.master ? 'master' : 'slave'}`)
})

require('./slave')