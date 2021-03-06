import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // email =""
  // password =""
  // errorMessage = ""
  // error: {name: string, message: string} = { name: "", message: ""}

  uid = this.activatedRoute.snapshot.params.id;

  eventLoginForm: FormGroup;
  isSubmitted: boolean = false;
  spin: boolean = false;
  owners: any;
  username: any;
  role: any;
  profiles: any;
  profID: any;
  comProf: Array<any> = [];
  eventId: any;
  companyProf: any;
  idNum: any;
  userId: any

  constructor(private location: Location, private rout: Router, 
    private authService: AuthService,private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,private alertCtrl: AlertController,
    public toastCtrl: ToastController,public loadingCtrl: LoadingController,
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.loginUser()
  }

  loginUser() {
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
      {type: 'required', message: 'Please enter a valid email'}
    ],
    password: [
      {type: 'required', message: '*required'},
      {type: 'required', message: 'Please enter a valid password'},
      {type: 'minlength', message: 'Password length can not be less than 5'},
      {type: 'maxlength', message: 'Password length has to be longer than 5'}
    ]
  }

  async signinUser() {

    this.authService.signAuth();

    console.log(this.eventLoginForm.value)
    
    // Logging in the current owner/user  
    this.authService.signinRestOwner(this.eventLoginForm.value.email, this.eventLoginForm.value.password).then((res) => {
      console.log('logged in: ', res.user)

      // Getting logged in owner
      let user = firebase.auth().currentUser.uid
      console.log('user: ', user)
      // Fetching the event owners to get their username when logged in
      firebase.firestore().collection('eventUser').doc(user).get().then(async (snapshot) => {
        this.owners = snapshot.data();
        this.username = snapshot.get('username');
        this.role = snapshot.get('role')

        if(this.role == 'eventUser'){

        // Fetching company profile to get the client code
          firebase.firestore().collection('UserProfile').doc(user).get().then((snapshot) => {
            this.companyProf = snapshot.data();
            console.log('only profile: ', this.companyProf)
            this.idNum = snapshot.get('id')
            console.log('client Codee: ', this.idNum)

            // Checking if the client code is available before logging in
            if (!this.idNum) {
              console.log(' IF Client Code: ', this.idNum)
              this.rout.navigateByUrl("complete");
            } else {
              console.log('Else User Client Code: ', this.idNum)
              this.rout.navigateByUrl("landing");
            }

          })
        } else{
          const alert = await this.alertCtrl.create({

            message: `Email not registered as a user. Click ok to register`,
            buttons: [
              {
                text: 'Cancel',
                handler: () => {
                  this.rout.navigateByUrl('login')
                }
              },
              {
                text: 'Ok',
                handler: () => {
                  this.rout.navigateByUrl('/register')
                }
              }
            ]
      
          });
          return await alert.present();
        }

      })

    }).then(() => {
        // this.rout.navigateByUrl('landing')
      
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

  register(){
    this.rout.navigateByUrl('register')
  }

  prev(){
    this.location.back()
  }

}
