

url = '/weather?address='


const fetcher = (loc)=>{
    message1.textContent = 'Loading Data'
    message2.textContent = ''
    locUrl = url + loc
    fetch(locUrl).then((response)=>{
        response.json().then((data)=>{
            if (data.error){
                return message1.textContent = data.error
            }
            message1.textContent = data.location
            message2.textContent = data.forecast.forecast
        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    fetcher(location)
})