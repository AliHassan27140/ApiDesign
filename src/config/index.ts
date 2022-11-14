//lodash.merge is used to merge objects
//lodash is used to manipulate objects
import merge from 'lodash.merge'

//process.env.NODE_ENV is used to get the environment
//NODE_ENV is a variable that is set by the system
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const stage = process.env.STAGE || 'local'

let envConfig

if (stage ==='production'){
    envConfig = require('./prod').default
}

else if (stage === 'testing'){
    envConfig = require('./testing').default
}

else {
    envConfig = require('./local').default
}

export default merge({
    stage,
    isProduction: stage === 'production',
    isTesting: stage === 'testing',
    port: 3000,
    secrets: {
        jwt: process.env.JWT_SECRET,
        dbUrl : process.env.DATABASE_URL
    }
}, envConfig)
