import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor( private authService: AuthService) { }

  ngOnInit() {
  }

  register(email,password){
    this.authService.registerUser(email.value, password.value)      
      .then((res) => {
        window.alert('registered')
      }).catch((error) => {
        window.alert(error.message)
      })
  }

}
