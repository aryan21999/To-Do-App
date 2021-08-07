function logIn() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
        axios.post('/register/login', {
            email: email,
            password: password
        })
        .then(function (response) {
            localStorage.setItem('token', response.data.token)
            console.log(response.data)
            location.replace('/views/index.html')
        })
        .catch(function (error) {
            console.log({ error: 'Invalid email or password'});
        })
}