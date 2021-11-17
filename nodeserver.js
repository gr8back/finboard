const express = require('express')
const app = express()
const port = 4000
const cors = require("cors")


const example = require('./test.json')
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/test', (req, res) => res.json(example))


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
