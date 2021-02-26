import { Component, OnInit } from '@angular/core';
import {Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController, LoadingController, ToastController } from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-a-login',
  templateUrl: './a-login.page.html',
  styleUrls: ['./a-login.page.scss'],
})
export class ALoginPage implements OnInit {

  //old
  //email =""
  //password =""
  // error: {name: string, message: string} = { name: "", message: ""}

  uid = this.activatedRoute.snapshot.params.id;

  eventLoginForm: FormGroup;
  isSubmitted: boolean = false;
  spin: boolean = false;
  owners: any;
  username: any;
  role: any;
  profiles: any;
  clientCode: any;
  profID: any;
  comProf: Array<any> = [];
  eventId: any;
  companyProf: any;

  constructor(private location: Location, private rout: Router, 
    private authService: AuthService,private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,private alertCtrl: AlertController,
    public toastCtrl: ToastController,public loadingCtrl: LoadingController,
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.loginOwner();
  }

  loginOwner() {
    this.eventLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.0]+.[a-zA-Z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    });
  }

  get email() {
    return this.eventLoginForm.get("email");
  }

  get password() {
    return this.eventLoginForm.get("password");
  }

  async signinOwner() {

   // const loading = await this.loadingCtrl.create();

   this.authService.signAuth();

    console.log(this.eventLoginForm.value)
    
    // Logging in the current owner/user  
    this.authService.signinRestOwner(this.eventLoginForm.value.email, this.eventLoginForm.value.password).then((res) => {
      console.log('logged in: ', res.user)

      // Getting logged in owner
      let user = firebase.auth().currentUser.uid
      console.log('user: ', user)
      // Fetching the event owners to get their username when logged in
      firebase.firestore().collection('RestaurantOwners').doc(user).get().then(async (snapshot) => {
        this.owners = snapshot.data();
        this.username = snapshot.get('username');
        this.role = snapshot.get('role')

        // const toast = await this.toastCtrl.create({
        //   message: "Welcome " + this.username,
        //   duration: 3000
        // });
        // toast.present();

        // Fetching company profile to get the client code
        firebase.firestore().collection('restProfile').doc(user).get().then((snapshot) => {
          this.companyProf = snapshot.data();
          console.log('only profile: ', this.companyProf)
          this.clientCode = snapshot.get('clientCode')
          console.log('client Codee: ', this.clientCode)

          // Checking if the client code is available before logging in
          if (this.clientCode) {
            console.log(' IF Client Code: ', this.clientCode)
            this.rout.navigateByUrl("dashboard");
          } else {
            console.log('Else User Client Code: ', this.clientCode)
            this.rout.navigateByUrl("profile");
          }

        })

      })

    }).then(() => {
        this.rout.navigateByUrl('dashboard')
      
    },
      async error => {
        const toast = await this.toastCtrl.create({
          message: error.message,
          duration: 3000
        });
        toast.present();
          console.log(error)
      }
    );
    //return await loading.present();
  }

  prev(){
    this.location.back()
  }

  register(){
    this.rout.navigateByUrl('signup')
  }

}
