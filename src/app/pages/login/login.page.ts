import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email =""
  password =""
  errorMessage = ""
  error: {name: string, message: string} = { name: "", message: ""}

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  clearErrorMessage(){
    this.errorMessage = "";
    this.error = { name: '', message: ''};
  }

  login(){
    this.clearErrorMessage();

    if(this.validateForm(this.email,this.password)){
      this.auth.loginEmail(this.email, this.password)
    .then(() => {
      this.router.navigate(['/home'])
    }).catch(_error => {
      this.error = _error
      this.router.navigate(['/login'])
    })
    }
  }

  validateForm(email, password){
    if(email.length === 0){
      this.errorMessage = "Please Enter Email Address";
      return false;
    }
    if(password.length === 0){
      this.errorMessage = "Please Enter Password";
      return false;
    }

    this.errorMessage = "";
    return true;
  }

}
