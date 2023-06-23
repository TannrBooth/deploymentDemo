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


app.use(express.json())
app.use(cors())
app.use(express.static('public'))

console.log(__dirname)

app.get('/', (req,res) => {
    res.status(200).sendFile(path.join(__dirname,'../public/index.html'))
})

app.get('/error', (req,res) => {
    try {
        nonExistentFunction();
    } catch (err) {
        rollbar.error('they broke the internet!')
    }
})

app.get('/castle', (req,res) => {
    res.status(200).send('<h1>Welcome to my castle!</h1>')
    rollbar.critical('Critical error')
})

app.get('/profile', (req,res) => {
    res.status(200).sendFile(path.join(__dirname,'../public/profile.html'))
    rollbar.warning(`I'm warning you, sonny`)
})

app.listen(4000, console.log('Server running on 4000!'))