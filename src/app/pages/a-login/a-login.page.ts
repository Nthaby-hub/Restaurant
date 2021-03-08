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
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

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
  require = true

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
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });
  }

  get email() {
    return this.eventLoginForm.get("email");
  }

  get password() {
    return this.eventLoginForm.get("password");
  }

  public errorMessages = {
    email: [
      {type: 'required', message: '*required'},
      {type: 'pattern', message: 'Please enter a valid email'}
    ],
    password: [
      {type: 'required', message: '*required'},
      {type: 'required', message: 'Please enter a valid password'},
      {type: 'minlength', message: 'Password length has to be longer than 5'},
      {type: 'maxlength', message: 'Password length can not exceed 15'}
    ]
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
      firebase.firestore().collection('RestaurantOwner').doc(user).get().then(async (snapshot) => {
        this.owners = snapshot.data();
        this.username = snapshot.get('username');
        this.role = snapshot.get('role')

        if(this.role == 'resttOwner'){
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
        }else{
          const alert = await this.alertCtrl.create({

            message: `Email not registered as a restaurent owner. Click ok to register`,
            buttons: [
              {
                text: 'Cancel',
                handler: () => {
                  this.rout.navigateByUrl('a-login')
                }
              },
              {
                text: 'Ok',
                handler: () => {
                  this.rout.navigateByUrl('/register')
                }
              },
              
            ]
      
          });
          return await alert.present();
        }

      })

    }).then(() => {
        // this.rout.navigateByUrl('dashboard')
      
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
