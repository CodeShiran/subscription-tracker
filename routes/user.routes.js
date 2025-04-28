import { Router } from "express";
import { getUser, getUsers } from "../controller/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router()

userRouter.get('/', getUsers)

userRouter.get('/:id', authorize, getUser)

userRouter.post('/', (req,res) => {
    res.send({title: 'create new user'})
})

userRouter.put('/:id', (req,res) => {
    res.send({title: 'update user'})
})

userRouter.delete('/:id', (req,res) => {
    res.send({title: 'delete user'})
})

export default userRouter

