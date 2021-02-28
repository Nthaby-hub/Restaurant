import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.page.html',
  styleUrls: ['./complete.page.scss'],
})
export class CompletePage implements OnInit {

  profileForm: FormGroup;
  isSubmitted: boolean = false;
  userId: any;
  company: string;

  set = {}

  constructor( private product: ProductsService, private modalCtrl: ModalController,
    private fb: FormBuilder, private rout: Router) { 
      this.company = localStorage.getItem('Name')
    }

  ngOnInit() {
    this.saveProfile();
  }

  saveProfile() {
    this.profileForm = this.fb.group({
      clientCode: ['', Validators.required],
      Name: ['', Validators.required],
      id: ['', Validators.required, Validators.minLength(13), Validators.maxLength(13)],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.0]+.[a-zA-Z]{2,4}$')]],
      website: ['', Validators.required]
    });
  }

  get Name() {
    return this.profileForm.get("Name");
  }

  get id() {
    return this.profileForm.get("id");
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

  async companyProf() {

    //const loading = await this.loadingCtrl.create();

    const user = firebase.auth().currentUser;
    this.userId = user.uid;

    firebase.firestore().collection('UserProfile').doc(this.userId).set({
      userId: this.userId,
      Name: this.profileForm.value.Name,
      id: this.profileForm.value.id,
      address: this.profileForm.value.address,
      phone: this.profileForm.value.phone,
      email: this.profileForm.value.email
    }).then(() => {
      // loading.dismiss().then(() => {
        this.rout.navigateByUrl('/landing');
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

}
