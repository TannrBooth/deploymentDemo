const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

let Rollbar = require('rollbar')
let rollbar = new Rollbar({
  accessToken: '31a2fcc95a234b179d933ce5f7320cf4',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

let tryFunc = () => {try {
    nonExistant();
} catch(err) {
    console.log(err);
    rollbar.error(err);
}}

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

console.log(__dirname)

app.get('/', (req,res) => {
    res.status(200).sendFile(path.join(__dirname,'../public/index.html'))
})

app.get('/error', tryFunc)

app.get('/castle', (req,res) => {
    res.status(200).send('<h1>Welcome to my castle!</h1>')
})

app.get('/profile', (req,res) => {
    res.status(200).sendFile(path.join(__dirname,'../public/profile.html'))
})

app.listen(4000, console.log('Server running on 4000!'))