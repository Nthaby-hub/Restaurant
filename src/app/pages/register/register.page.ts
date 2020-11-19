import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router'
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email =""
  password =""
  error: {name: string, message: string} = { name: "", message: ""}

  constructor( private authService: AuthService, private route: Router, private location: Location) { }

  ngOnInit() {
  }

  register(email,password){
    if(this.validateForm(this.email,this.password)){
      this.authService.registerUser(email, password)      
      .then((res) => {
        window.alert('registered')
        this.route.navigateByUrl('login')
      }).catch((error) => {
        window.alert(error.message)
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

  prev(){
    this.location.back()
  }

  login(){
    this.route.navigateByUrl('login')
  }

}
