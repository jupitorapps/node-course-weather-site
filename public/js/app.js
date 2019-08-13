//console.log('Client side js file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e => { //e for event
    e.preventDefault()

    const location = search.value

    const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(location)
    console.log(url)
    messageOne.textContent = 'Loading ................'
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                //return  console.log('It seems something wrong with the location, please try again')
                messageOne.textContent('It seems something wrong with the location, please try again')
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })

}))

