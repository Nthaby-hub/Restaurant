import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router'
import { Location } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  eventOwnerForm: FormGroup;
  isSubmitted: boolean = false;

  constructor( private authService: AuthService, private route: Router,
     private location: Location, private fb: FormBuilder,
     private alertCtrl: AlertController) { }

  ngOnInit() {
    this.addOwner()
  }

  addOwner(){
    this.eventOwnerForm = this.fb.group({
      username: ['', [Validators.required,Validators.minLength(4), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.0]+.[a-zA-Z]{2,4}$')]],
      // mobile: ['',  [ Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });
  }

  get username() {
    return this.eventOwnerForm.get("username");
  }

  get email() {
    return this.eventOwnerForm.get("email");
  }

  get password() {
    return this.eventOwnerForm.get("password");
  }

  public errorMessages = {
    username: [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username cannot be less than 3 characters.' },
      { type: 'maxlength', message: 'Username cannot be longer than 50 characters' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please provide valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password cannot be less than 5 characters.' },
      { type: 'maxlength', message: 'Password cannot be more than 15 characters.' }
    ]
  }

  async register() {

    const alert = await this.alertCtrl.create({

      message: `Your account is registered successfully, click Okay to continue to login.`,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('User: ', this.eventOwnerForm.value);
            this.isSubmitted = true;
            if (this.eventOwnerForm.valid) {
              this.authService.signupRestOwner(this.eventOwnerForm.value.email, this.eventOwnerForm.value.password).then((res) => {
                return firebase.firestore().collection('eventUser').doc(res.user.uid).set({
                  username: this.eventOwnerForm.value.username,
                  role: 'eventUser'
                }).then(() => {
                  console.log('User: ', res.user);
                  this.route.navigateByUrl('login');
                }).catch(function (error) {
                  console.log(error)
                })
              });
            } else {
              console.log('Failed to register');
            }
          }
        },
      ]

    });
    return await alert.present();


  }

  prev(){
    this.location.back()
  }

  login(){
    this.route.navigateByUrl('login')
  }

}
