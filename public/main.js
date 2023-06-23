const castle = document.querySelector('img')

let Rollbar = require('rollbar')
let rollbar = new Rollbar({
  accessToken: '31a2fcc95a234b179d933ce5f7320cf4',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

const welcome = evt => {
    alert(`Welcome to my castle! Please don't touch the floors, they're being redone.`)
}

castle.addEventListener('click',welcome)