import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.page.html',
  styleUrls: ['./add-dish.page.scss'],
})
export class AddDishPage implements OnInit {

  eventForm: FormGroup;
  private todo : FormGroup;
  eventOwnerId: any;
  restId: any;
  upLoadedFile: string | ArrayBuffer;

  constructor(private product: ProductsService,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private router: Router,
    private modalCtrl: ModalController) { }

  ngOnInit() {

    this.addDish();
  }

  logForm(){
    console.log(this.todo.value)
  }

  deleteFood(id){
    this.product.deleteFood(id)
  }

  addDish(){
    this.eventForm = this.fb.group({
      dishName: ['', Validators.required],
      price: ['', Validators.required],
      imgUrl: ['', Validators.required],
      description: ['', Validators.required],
      
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
      this.eventForm.get('imgUrl').setValue(this.upLoadedFile);
      //console.log(this.upLoadedFile);
    };
  }

  async dishSubmit(){

    const alert = await this.alertCtrl.create({

      message: `Dish added successfully.`,
      buttons: [
        {
          text: 'Okay',
          handler: () => {

            const user = firebase.auth().currentUser
            this.eventOwnerId = user.uid

            firebase.firestore().collection('rest1').add({
              eventOwnerId: this.eventOwnerId,
              dishName: this.eventForm.value.dishName,
              price: this.eventForm.value.price,
              imgUrl: this.eventForm.value.imgUrl,
              description: this.eventForm.value.description,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            }).then((doc) => {
              doc.set({ restId: doc.id }, { merge: true }).then(() => {
                console.log('restaurant id: ', this.restId)
                
              })
              this.modalCtrl.dismiss();
              this.eventForm.reset();
            }).catch(function(error){
              console.log(error)
            });
          },
        },
      ]

    });
    return await alert.present();

  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

}
