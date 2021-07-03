const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
 
 
const config = {
    app_dir: path.dirname(require.main.filename)
}

const env = dotenv.config({ path: path.join(config.app_dir, '.env') }).parsed
const envOverride = dotenv.config({ path: path.join(config.app_dir, '.env.override') }).parsed

// load .env
Object.keys(env || {}).forEach((key) => {
    if (process.env[key] === undefined) {
        process.env[key] = env[key]
        config[key.toLowerCase()] = env[key]
    } else {
        config[key.toLowerCase()] = process.env[key]
    }
})

// merge .env.override
Object.keys(envOverride || {}).forEach((key) => {
    process.env[key] = envOverride[key]
    config[key.toLowerCase()] = envOverride[key]
})



module.exports = config