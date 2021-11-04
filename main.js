

const UI = {
    loadSelector(){
        const fullName = document.querySelector(".fullName");
        const userName = document.querySelector(".userName");
        const inputEmail = document.querySelector(".inputEmail");
        const phoneNumber = document.querySelector(".phoneNumber");
        const strongPassword = document.querySelector(".strongPassword");
        const validUrl = document.querySelector(".validUrl");
        const form = document.querySelector(".inputForm");
        const showPassword = document.querySelector(".showPassword");
        const message = document.querySelectorAll(".message");
        const copyText = document.querySelector(".copyText");
        return {
            fullName,
            userName,
            inputEmail,
            phoneNumber,
            strongPassword,
            validUrl,
            form,
            showPassword,
            message,
            copyText
        }
    },
    emptyInputFild(fild){
        fild.value = ''
    },
    copyTextFromInput(){
        const {strongPassword} = this.loadSelector();
        strongPassword.select();
        strongPassword.setSelectionRange(0,99999);
        navigator.clipboard.writeText(strongPassword.value);
        alert("Copied the text: " + strongPassword.value)
    },
    validateURL(){
        const {validUrl, message} = this.loadSelector();
        const inputUrl = validUrl.value;
        const regex = /(http:\/\/)?(https:\/\/)?(www)?\.?(facebook)\.\w.+\/\w.+/gim
        const result = regex.test(inputUrl);
        this.emptyInputFild(validUrl);
        if(result){
            if(message[5]){
                message[5].innerHTML = '';
            }
            return inputUrl
        }else{
            message[5].textContent = "Please input valid facebook url"
        }
    },
    displayPassword(){
        const {strongPassword, showPassword} = this.loadSelector();
        showPassword.addEventListener('click', () => {
            if(strongPassword.type === 'password'){
                strongPassword.type = 'text'
                showPassword.textContent ="Hide"
            }else{
                strongPassword.type = 'password';
                showPassword.textContent ="Show"
            }
            
        })
    },
    passwordEvent(){
        const {showPassword, strongPassword, copyText} = this.loadSelector();
        strongPassword.addEventListener('click', ()=>{
            showPassword.style.display = "block"
            copyText.style.display = "block"
        })
    },
    validatePassword(){
        const {strongPassword, message, showPassword} = this.loadSelector();
        const password = strongPassword.value;
        const regex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
        const result = regex.test(password);
        this.emptyInputFild(strongPassword);
        if(result){
            if(message[4]){
                message[4].innerHTML = '';
            }
            return password
        }else{
            message[4].textContent = "Your password is too week. please make a strong password"
        }
    },
    validatePhoneNumber(){
        const {phoneNumber, message} = this.loadSelector();
        const inputPhone = phoneNumber.value;
        const regex = /(\+88)?01[3|5-9]\d{8}/gi
        const result = regex.test(inputPhone);
        this.emptyInputFild(phoneNumber)
        if(result){
            if(message[3]){
                message[3].innerHTML = ''
            }
            return inputPhone;
        }else{
            message[3].textContent = 'Please Input valid phone number'
        }
    },
    validateEmail(){
        const {inputEmail, message} = this.loadSelector();
        const inputMail = inputEmail.value;
        const regex = /\w{2,}.+?\w?@\w{3,30}\.\w{2,6}\.?(\w{2,6})?/gim
        const result = regex.test(inputMail);
        this.emptyInputFild(inputEmail);
        if(result){
            if(message[2]){
                message[2].innerHTML = "";
            }
            return inputMail
        }else{
            message[2].textContent = "Please input valid Email address";
        }
    },
    validateUserName(){
        const {userName, message} = this.loadSelector();
        const userNameValue = userName.value;
        const regex = /\w{5,}/gim
        const result = regex.test(userNameValue);
        this.emptyInputFild(userName)
        if(result){
            if(message[1]){
                message[1].innerHTML = '';
            }
            return userNameValue;
        }else{
            message[1].textContent = "Please input valid username"
        }
    },
    validateFName(){
        const {fullName, message} = this.loadSelector();
        const name = fullName.value;
        const regx = /^[a-zA-Z]{5,40}$/gim
        const text = regx.test(name);
        this.emptyInputFild(fullName);
        if(text){
            if(message[0]){
                message[0].innerHTML = "";
            }
            return name;
        }else{
            message[0].textContent = "Please input a-z or A-Z do not use any number and special carectar."
        }
    },
    init(){
        const {copyText,form} = this.loadSelector();
        this.passwordEvent();
        this.displayPassword();
        copyText.addEventListener("click", ()=>{
            this.copyTextFromInput();
        })

        form.addEventListener('submit', (e) =>{
            e.preventDefault();
            this.validateFName();
            this.validateUserName();
            this.validateEmail();
            this.validatePhoneNumber()
            this.validatePassword()
            this.validateURL()
        })
    }
}
UI.init()





