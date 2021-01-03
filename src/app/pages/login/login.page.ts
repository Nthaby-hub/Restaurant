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
  idNum: any;
  profID: any;
  comProf: Array<any> = [];
  eventId: any;
  companyProf: any;

  constructor(private location: Location, private rout: Router, 
    private authService: AuthService,private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,private alertCtrl: AlertController,
    public toastCtrl: ToastController,public loadingCtrl: LoadingController,) { }

  ngOnInit() {
    this.loginUser()
  }

  loginUser() {
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

  async signinUser() {

   // const loading = await this.loadingCtrl.create();

    console.log(this.eventLoginForm.value)
    this.isSubmitted = true;
    // Logging in the current owner/user  
    this.authService.signinRestOwner(this.eventLoginForm.value.email, this.eventLoginForm.value.password).then((res) => {
      console.log('logged in: ', res)

      // Getting logged in owner
      let user = firebase.auth().currentUser.uid
      console.log('user: ', user)
      // Fetching the event owners to get their username when logged in
      firebase.firestore().collection('eventUser').doc(user).get().then(async (snap) => {
        this.owners = snap.data();
        this.username = snap.get('username');
        this.role = snap.get('role')

        // const toast = await this.toastCtrl.create({
        //   message: "Welcome " + this.username,
        //   duration: 3000
        // });
        // toast.present();

        // Fetching company profile to get the client code
        firebase.firestore().collection('UserProfile').doc(user).get().then((snapshot) => {
          this.companyProf = snapshot.data();
          console.log('only profile: ', this.companyProf)
          this.idNum = snapshot.get('id')
          console.log('client Codee: ', this.idNum)

          // Checking if the client code is available before logging in
          if (this.idNum) {
            console.log(' IF Client Code: ', this.idNum)
            this.rout.navigateByUrl("landing");
          } else {
            console.log('Else User Client Code: ', this.idNum)
            this.rout.navigateByUrl("complete");
          }

        })

      })

    }).then(() => {
        this.rout.navigateByUrl('landing')
      
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

  // clearErrorMessage(){
  //   this.errorMessage = "";
  //   this.error = { name: '', message: ''};
  // }

  // login(){
  //   this.clearErrorMessage();

  //   if(this.validateForm(this.email,this.password)){
  //     this.auth.loginEmail(this.email, this.password)
  //   .then(() => {
  //     this.router.navigateByUrl('complete')
  //   }).catch(_error => {
  //     this.error = _error
  //     this.router.navigateByUrl('login')
  //   })
  //   }
  // }

  // validateForm(email, password){
  //   if(email.length === 0){
  //     alert("Please Enter Email Address");
  //     return false;
  //   }
  //   if(password.length === 0){
  //     alert("Please Enter Password");
  //     return false;
  //   }

  //   this.errorMessage = "";
  //   return true;
  // }

  register(){
    this.rout.navigateByUrl('register')
  }

  prev(){
    this.location.back()
  }

}
