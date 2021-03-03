import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service'
import { ModalController } from '@ionic/angular'
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileForm: FormGroup;
  isSubmitted: boolean = false;
  eventOwnerId: any;
  company: string;

  set = {}

  //old
  Items: any;
  title = 'khumalo3';
  images: any =[];
  allfiles: any =[];
  profile = {} as Profiling;
  clientCode: any;

  constructor( private product: ProductsService, private modalCtrl: ModalController,
    private fb: FormBuilder, private rout: Router) { 
      this.company = localStorage.getItem('companyName')
    }

  ngOnInit() {
   this.saveProfile()
  }
  
  saveProfile() {
    this.profileForm = this.fb.group({
      // clientCode: ['', Validators.required],
      companyName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.0]+.[a-zA-Z]{2,4}$')]],
      website: ['', Validators.required]
    });
  }

  // get clientCode() {
  //   return this.profileForm.get("clientCode");
  // }

  get companyName() {
    return this.profileForm.get("companyName");
  }

  get address() {
    return this.profileForm.get("address");
  }

  get email() {
    return this.profileForm.get("email");
  }
  
  get phone() {
    return this.profileForm.get("phone");
  }

  get website() {
    return this.profileForm.get("website");
  }

  async companyProf() {

    //const loading = await this.loadingCtrl.create();

    const user = firebase.auth().currentUser;
    this.eventOwnerId = user.uid;

    this.clientCode = this.companyName+this.eventOwnerId;

    firebase.firestore().collection('restProfile').doc(this.eventOwnerId).set({
      eventOwnerId: this.eventOwnerId,
      clientCode: this.clientCode,
      companyName: this.profileForm.value.companyName,
      address: this.profileForm.value.address,
      phone: this.profileForm.value.phone,
      email: this.profileForm.value.email,
      website: this.profileForm.value.website
    }).then(() => {
      // loading.dismiss().then(() => {
        this.rout.navigateByUrl('/dashboard');
        this.profileForm.reset();
      // })
    },
      error => {
        // loading.dismiss().then(() => {
          console.log(error)
        // })
      }
    );

    // return await loading.present();
  }

  //old
  // saveProfile(){
  //   this.product.addProfile(this.profile)
  // }


  close(){
    this.modalCtrl.dismiss();
  }

}
