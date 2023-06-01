import { Router } from 'restify-router'
import { Transform } from './transforms.router'

const PrincipalRouter = new Router()

const RouteTransform = new Router()

RouteTransform.add('api/v1/transform', Transform)

PrincipalRouter.add('/', RouteTransform)

// PrincipalRouter.add('/api/services', ThreeRouter)

export default PrincipalRouter
