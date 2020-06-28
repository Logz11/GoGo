function get(element){
    return document.getElementById(element);
}

let username = get('username');
let password = get('password');
let loginBtn = get('login-btn');

console.log(loginBtn);

loginBtn.addEventListener('click', validate);

function validate(e){

    if (password.value !== '' && username.value !== '') {
        e.preventDefault();
        window.location.href = 'selector.html'
    } else {
        e.preventDefault();
        alert('Error: Please enter valid login credentials.');
    }

}