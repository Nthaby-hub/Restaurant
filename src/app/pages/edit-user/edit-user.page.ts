import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/app'
import 'firebase/firestore'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  updateForm: FormGroup

  selectedFile: File = null;
  upLoadedFile: any;
  id: any;
  users: firebase.firestore.DocumentData;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private loaderCtrl: LoadingController,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)

    firebase.firestore().collection('UserProfile').doc(this.id).get().then(snapshot => {
      this.users = snapshot.data();
      console.log('New Document Data: ', this.users)
      this.updateForm.controls['Name'].setValue(this.users.Name),
        this.updateForm.controls['address'].setValue(this.users.address),
        this.updateForm.controls['phone'].setValue(this.users.phone),
        this.updateForm.controls['email'].setValue(this.users.email),
        this.updateForm.controls['imgUrl'].setValue(this.users.imgUrl)
    });

    this.updateUser();
  }

  updateUser() {
    this.updateForm = this.fb.group({
      Name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.0]+.[a-zA-Z]{2,4}$')]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
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
                this.router.navigateByUrl('/user-profile')
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

    firebase.firestore().collection('UserProfile').doc(this.id).update({
      Name: this.updateForm.value.Name,
      address: this.updateForm.value.address,
      phone: this.updateForm.value.phone,
      email: this.updateForm.value.email,
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

}
