const form = document.querySelector('form')
const searchValue = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')
const message3 = document.querySelector('#message3')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const place = searchValue.value

    if (/[^a-zA-Z0-9\-\/]/.test(place)) {
        message1.textContent = "Information not matched"
        message2.textContent = ""
    } else {
        message1.textContent = "Loading. . ."
        message2.textContent = ""
        message3.textContent = ""
        if (place.length == 0) {
            message1.textContent = "please enter any country name "
            message2.textContent = ""

        } else {
            fetch(`http://localhost:3000/weather?address=${place}`).then((response) => {
                console.log(response)
                response.json().then((data) => {
                    console.log(data)
                    if (!data) {
                        return message1.textContent = "Error page not found"
                    }
                    message1.textContent = "place: " + data.place
                    message2.textContent = "climate: " + data.climate
                    message3.textContent = `The expected maximum temperature is from ${data.temp_min} celsius to ${data.temp_max} celsius`            

                })
            })
        }
    }
    searchValue.value = ""
})


