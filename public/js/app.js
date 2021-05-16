
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//  response.json().then((data) => {
//     console.log(data)
//  })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const image = document.querySelector('#img')



weatherForm.addEventListener('submit',(event)=>{
    //for not making browser to refresh.
    event.preventDefault()

    const address = search.value

    image.style.visibility="hidden"
    messageOne.textContent = 'Loading......'
    messageTwo.textContent = ''
    
    const url = '/weather?address='+address
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
                messageOne.textContent = data.error
            else{
                image.setAttribute('src',"http://openweathermap.org/img/wn/"+data.forecast.icon+"@2x.png")   
                image.style.visibility="visible"
                messageOne.textContent = data.location
                const forecastData = 'The weather looks as '+data.forecast.description + '!. It is currently ' +data.forecast.temperature + ' degrees out.'
                messageTwo.textContent = forecastData
            }
        })
    })

})