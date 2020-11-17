import { Component, OnInit } from '@angular/core';
import {Location } from '@angular/common';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-a-login',
  templateUrl: './a-login.page.html',
  styleUrls: ['./a-login.page.scss'],
})
export class ALoginPage implements OnInit {

  email =""
  password =""
  error: {name: string, message: string} = { name: "", message: ""}

  constructor(private location: Location, private rout: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  prev(){
    this.location.back()
  }

  register(){
    this.rout.navigateByUrl('signup')
  }

  login(){

    if(this.validateForm(this.email,this.password)){
      this.auth.loginEmail(this.email, this.password)
    .then(() => {
      this.rout.navigateByUrl('dashboard')
    }).catch(_error => {
      this.error = _error
      this.rout.navigateByUrl('a-login')
    })
    }
  }

  validateForm(email, password){
    if(email.length === 0){
      alert("Please Enter Email Address");
      return false;
    }
    if(password.length === 0){
      alert("Please Enter Password");
      return false;
    }

    return true;
  }

}
