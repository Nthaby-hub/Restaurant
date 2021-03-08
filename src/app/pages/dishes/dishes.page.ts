import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service'
import { ModalController } from '@ionic/angular'
import { UpdatePage } from '../update/update.page'
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { AddDishPage } from './add-dish/add-dish.page';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.page.html',
  styleUrls: ['./dishes.page.scss'],
})
export class DishesPage implements OnInit {

  items: any;
  images: any =[];
  allfiles: any =[];
  eventForm: FormGroup;
  selectedFile: File = null;
  upLoadedFile: any
  categories: Array<any> = [];
  catId: any;
  eventOwnerId: any;
  restId: any;

  private todo : FormGroup;
  userC: any;
  food: Array<any> = []

  constructor( private product: ProductsService, private modalCtrl: ModalController, private fb: FormBuilder,
     private location: Location,
     public loadingCtrl: LoadingController, 
     private alertCtrl: AlertController,
     private authService: AuthService) { }

  ngOnInit() {

    const user = firebase.auth().currentUser
    console.log("user: ",user)

    firebase.auth().onAuthStateChanged((users) => {
      if(users){
        this.eventOwnerId = this.authService.getSession()
        this.eventOwnerId = user.uid

        firebase.firestore().collection('rest1').where("eventOwnerId", "==", this.eventOwnerId)
        .onSnapshot(res => {
          res.forEach(doc => {
            this.food.push(Object.assign(doc.data(), {uid: doc.id}))
            console.log('Products: ', this.food)
          })
        })
      }
    })
    // this.product.getMenu().subscribe(data_I => {
    //   this.items = [];
    //   data_I.forEach( a => {
    //     let data: any = a.payload.doc.data();
    //     data.id = a.payload.doc.id;
    //     this.items.push(data);
    //   })
    // })

    this.addDish();
   }

   logForm(){
    console.log(this.todo.value)
  }

  deleteFood(id){
    this.product.deleteFood(id)
    console.log('item id: ', id)
    // firebase.firestore().collection('Products').doc(id).delete()
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: AddDishPage,
      cssClass: 'AddDish'
    });
    return await modal.present();
  }

  prev(){
    this.location.back()
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

  addDish(){
    this.eventForm = this.fb.group({
      dishName: ['', Validators.required],
      price: ['', Validators.required],
      imgUrl: ['', Validators.required],
      description: ['', Validators.required],
      
    });
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
                console.log('event iddddd: ', this.restId)
                // this.router.navigate(['/create-ticket', this.eventId]);
                // this.eventForm.reset();
              })
              // this.nav.navigateRoot('/create-ticket');
              //this.router.navigate(['/create-ticket', doc.id]);
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

}
