import express from 'express';
import cors from 'cors';

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

import { createUser, deleteUser, updateUser, getUser, getAllUsers } from './controller/controller.js'

const router = express.Router()

app.get('/', (_, res) => res.send('Hello World'))

app.use('/api/user', router).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

const port = process.env.ENV === "PROD" ? process.env.API_ENDPOINT : 3000

router.get('/', getUser)

router.get('/all', getAllUsers)

router.post('/', createUser)

router.put('/', updateUser)

router.delete('/', deleteUser)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// Export our app for testing purposes
export default app;