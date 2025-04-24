import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('hi shiran')
})

app.listen(3000, () => {
    console.log('server running on 3000')
})