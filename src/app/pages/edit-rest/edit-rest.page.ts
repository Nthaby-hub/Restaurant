import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-rest',
  templateUrl: './edit-rest.page.html',
  styleUrls: ['./edit-rest.page.scss'],
})
export class EditRestPage implements OnInit {
  
  updateForm: FormGroup

  selectedFile: File = null;
  upLoadedFile: any;
  id: any;
  users: firebase.firestore.DocumentData;

  constructor( private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private loaderCtrl: LoadingController,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private location: Location) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)

    firebase.firestore().collection('restProfile').doc(this.id).get().then(snapshot => {
      this.users = snapshot.data();
      console.log('New Document Data: ', this.users)
      this.updateForm.controls['companyName'].setValue(this.users.companyName),
        this.updateForm.controls['address'].setValue(this.users.address),
        this.updateForm.controls['phone'].setValue(this.users.phone),
        this.updateForm.controls['email'].setValue(this.users.email),
        this.updateForm.controls['website'].setValue(this.users.website),
        this.updateForm.controls['imgUrl'].setValue(this.users.imgUrl)
    });

    this.updateUser();
  }

  updateUser() {
    this.updateForm = this.fb.group({
      companyName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.0]+.[a-zA-Z]{2,4}$')]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
      website: ['', Validators.required],
      imgUrl: ['', Validators.required]
    });
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadstart = (p) => {
      console.log(p);
    };
    reader.onloadend = (e) => {
      console.log(e.target);
      this.upLoadedFile = reader.result;
      this.updateForm.get('imgUrl').setValue(this.upLoadedFile);
      //console.log(this.upLoadedFile);
    };
  }

  async presentLoading(){

    const loader = await this.loaderCtrl.create({
      message: 'Updating User Details',
      duration: 2000,
      
    }).then((res) => {
      res.present()

      res.onDidDismiss().then(async (dis) => {
        console.log('Loading dismissed after 2 seconds', dis)
        const alert = await this.alertCtrl.create({
        
          message: `User updated successfully`,
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.router.navigateByUrl('/rest-profile')
              }
            }
          ]
  
        });
        return await alert.present();
      })
    });

  } 

  async save() {

    this.presentLoading()

    firebase.firestore().collection('restProfile').doc(this.id).update({
      companyName: this.updateForm.value.companyName,
      address: this.updateForm.value.address,
      phone: this.updateForm.value.phone,
      email: this.updateForm.value.email,
      website: this.updateForm.value.website,
      imgUrl: this.updateForm.value.imgUrl,
    }).then(() => {
      this.updateForm.reset();
    }).catch(async error => {
      console.log('error ',error)
      const toast = await this.toastCtrl.create({
        message: error.message,
        duration: 3000
      });
      toast.present();
    });

  }

  prev(){
    this.location.back()
  }


}
