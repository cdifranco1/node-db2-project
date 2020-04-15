const express = require('express')
const apiRoute = require('./api')

const port = process.env.PORT || 5000;
const app = express()

app.use(express.json())
app.use('/api', apiRoute)

app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})