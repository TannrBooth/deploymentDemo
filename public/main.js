const castle = document.querySelector('img')

const welcome = evt => {
    alert(`Welcome to my castle! Please don't touch the floors, they're being redone.`)
}

castle.addEventListener('click',welcome)