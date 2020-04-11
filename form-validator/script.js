const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
    
}

checkEmail = (input) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(regex.test(input.value.trim())){
        showSuccess(input)
    }else{
        showError(input, 'Email is not valid');
    }
    //return regex.test(String(input).toLowerCase());
}


checkRequired = (inputArray) => {
    inputArray.forEach(input => {
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`);
        }else{
            showSuccess(input)
        }
    });
}

checkLength = (input, min, max) => {
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    }else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    }else{
        showSuccess(input)
    }
}

checkPasswordsMatch = (input1, input2) =>{
    if(input1.value !== input2.value){
        showError(input2, 'Passwords do not match');
    }else{
        showSuccess(input2)
    }
}

getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

validateFunctions = () => {
    checkRequired([username, email, password, password2]);
    checkLength(username, 3,15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2)
}

//Event Listeners
form.addEventListener('submit', function(e){
    e.preventDefault();
    validateFunctions()
});
//on input change to make it more dynamic


username.addEventListener('keydown', () => {
    validateFunctions()
})
email.addEventListener('keydown', () => {
    validateFunctions()
})
password.addEventListener('keydown', () => {
    validateFunctions()
})

