import restify from 'restify'
import morgan from 'morgan'
import bunyan from 'bunyan'

import PrincipalRouter from './ruoter'

const server = restify.createServer({
  name: process.env.APP_NAME,
  log: bunyan.createLogger({
    name: 'audit',
    level: 'error'
  })
})

server.use(morgan('dev'))

PrincipalRouter.applyRoutes(server)

const initServer = async () => {
  server.listen(process.env.SERVER_PORT, () => {
    console.log('listen at   %s', server.name, server.url)
  })
}

export { initServer, server }
