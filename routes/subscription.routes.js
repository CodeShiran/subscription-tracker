import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controller/subscription.controller.js";

const subscriptionRouter = Router()

subscriptionRouter.get('/', (req, res) => {
    res.send({title: 'get all subscriptions'})
})

subscriptionRouter.get('/:id', (req, res) => {
    res.send({title: 'get subscription details'})
})

subscriptionRouter.post('/',authorize, createSubscription)

subscriptionRouter.put('/:id', (req, res) => {
    res.send({title: 'update subscription'})
})

subscriptionRouter.delete('/:id', (req, res) => {
    res.send({title: 'delete subscription'})
})

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions)

subscriptionRouter.put('/', (req, res) => {
    res.send({title: 'cancel subscriptions'})
})

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({title: 'get upcoming renewals'})
})



export default subscriptionRouter