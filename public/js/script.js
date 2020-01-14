const formData = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message-1')
const message_two = document.querySelector('#message-2')


formData.addEventListener('submit',(e) => {
    e.preventDefault();
    if (!search.value) {
         message.textContent = ''
         message_two.textContent = 'Please Enter Address' 
         return false;
    }
    message.textContent = 'Loading...'
    message_two.textContent = 'Fetching Location for ' + search.value

    fetch('http://localhost:3010/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            message.textContent = ''
            if (data.error) {
                message_two.textContent = 'Error: '+data.error
            } else {
                 message.textContent = data.location
                message_two.textContent = data.forcast
            }
        })
    })
})