"use strict";

class UserForm {
  constructor() {
    this.loginForm = document.getElementById('login');
    this.registerForm = document.getElementById('register');
    this.loginForm.querySelector('.button').addEventListener('click', this.loginFormAction.bind(this));
    this.registerForm.querySelector('.button').addEventListener('click', this.registerFormAction.bind(this));

    this.loginErrorMessageBox = this.loginForm.querySelector('.ui.message');
    this.loginErrorMessageBox.style.display = 'none';
    this.registerErrorMessageBox = this.registerForm.querySelector('.ui.message');
    this.registerErrorMessageBox.style.display = 'none';

    this.loginFormCallback = (f) => f;
    this.registerFormCallback = (f) => f;
  }

  setLoginErrorMessage(message) {
    this.loginErrorMessageBox.innerText = message;
    this.loginErrorMessageBox.style.display = 'block';
    setTimeout(() => { this.loginErrorMessageBox.style.display = 'none'; }, 5000);
  }

  setRegisterErrorMessage(message) {
    this.registerErrorMessageBox.innerText = message;
    this.registerErrorMessageBox.style.display = 'block';
    setTimeout(() => { this.registerErrorMessageBox.style.display = 'none'; }, 5000);
  }

  loginFormAction(event) {
    event.preventDefault();
    this.loginFormCallback(this.getData(this.loginForm));
    this.loginForm.reset();
  }

  registerFormAction(event) {
    event.preventDefault();
    this.registerFormCallback(this.getData(this.registerForm));
    this.registerForm.reset();
  }

  getData(form) {   
    const login = form.querySelector('[name="email"]').value;
    const password = form.querySelector('[name="password"]').value;
    return { login, password };
  }
}

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (response) => {
        if (response.success) {
            location.reload();
        } else {
            console.log(response.error);
        }
    });
};

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (response) => {
        if (response.success) {
            location.reload();
        } else {
            console.log(response.error);
        }
    });
};