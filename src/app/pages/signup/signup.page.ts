import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router'
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { AlertController, NavController, LoadingController } from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  eventOwnerForm: FormGroup;
  isSubmitted: boolean = false;
  // email =""
  // password =""
  // error: {name: string, message: string} = { name: "", message: ""}
  constructor( private authService: AuthService,
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
     private route: Router, 
     private location:Location) { }

  ngOnInit() {
    this.addOwner();
  }

  // register(email,password){
  //   if(this.validateForm(this.email,this.password)){
  //     this.authService.registerUser(email, password)      
  //     .then((res) => {
  //       window.alert('registered')
  //       this.route.navigateByUrl('a-login')
  //     }).catch((error) => {
  //       window.alert(error.message)
  //     })
  //   }
  // }

  addOwner() {
    this.eventOwnerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.0]+.[a-zA-Z]{2,4}$')]],
      // mobile: ['',  [ Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
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

  async registerOwner() {

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
                return firebase.firestore().collection('RestaurantOwner').doc(res.user.uid).set({
                  username: this.eventOwnerForm.value.username,
                  role: 'resttOwner'
                }).then(() => {
                  console.log('User: ', res.user);
                  this.route.navigateByUrl('a-login');
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
    this.route.navigateByUrl('a-login')
  }

}
