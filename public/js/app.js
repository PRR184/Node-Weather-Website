
console.log('Client side JS')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//  response.json().then((data) => {
//     console.log(data)
//  })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit',(event)=>{
    //for not making browser to refresh.
    event.preventDefault()

    const address = search.value

    messageOne.textContent = 'Lodaing......'
    messageTwo.textContent = ''
    
    const url = 'http://localhost:3000/weather?address='+address
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
                messageOne.textContent = data.error
            else{   
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

})