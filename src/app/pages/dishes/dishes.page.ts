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

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.page.html',
  styleUrls: ['./dishes.page.scss'],
})
export class DishesPage implements OnInit {

  items: any;
  // Items: any;
  title = 'khumalo3';
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

  constructor( private product: ProductsService, private modalCtrl: ModalController, private fb: FormBuilder,
     private location: Location,
     public loadingCtrl: LoadingController, 
     private alertCtrl: AlertController) { }

  ngOnInit() {
    this.product.getMenu().subscribe(data_I => {
      this.items = [];
      data_I.forEach( a => {
        let data: any = a.payload.doc.data();
        data.id = a.payload.doc.id;
        this.items.push(data);
      })
    })

    this.addDish();
   }

   logForm(){
    console.log(this.todo.value)
  }

  deleteFood(id){
    this.product.deleteFood(id)
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: UpdatePage,
      cssClass: ''
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


  // //old
  // fileuploads(event)
  //   {
  //       const files = event.target.files;
  //       console.log(files);
  //       if(files)
  //       {
  //         for (let i = 0; i <  files.length; i++){
  //           const image={
  //             name : '',
  //             type : '',
  //             size : '',
  //             url : ''
  //           };
  //           this.allfiles.push(files[i]);
  //           image.name = files[i].name;
  //           image.type = files[i].type;
  //           const size = files[i].size / 1000;
  //           const mbc = size + '';
  //           const mb = mbc.split('.')[0];
  //           const length = mb.length;
  //             if(length === 4 || length === 5)
  //             {
  //               const mbsize = size /1000;
  //               const splitdata = mbsize + '';
  //               const splitvalues = splitdata.split('.');
  //               let secondaryvariable ='';
  //               for(let j=0; j < splitvalues.length;j++)
  //               {
  //                 if(j===1)
  //                 {
  //                   secondaryvariable = splitvalues[j].slice(0,2);
  //                 }
  //               }
  //               image.size = splitvalues[0] + '.' + secondaryvariable + 'MB'
  //             }else{
  //               const splitdata = size + '';
  //               const splitvalues = splitdata.split('.');
  //               let secondaryvariable ='';
  //               for(let j=0; j < splitvalues.length;j++)
  //               {
  //                 if(j===1)
  //                 {
  //                   secondaryvariable = splitvalues[j].slice(0,2);
  //                 }
  //               }
  //               image.size = splitvalues[0] + '.' + secondaryvariable + 'KB'
  //             }
  //           const reader = new FileReader();
  //           reader.onload = (filedata)=>{
  //             image.url = reader.result + '';
  //             this.images.push(image);
  //           };
  //           reader.readAsDataURL(files[i]);
  //         }
  //       }
  //         event.srcElement.value = null;
  //   }
  //   deleteImage(image: any)
  //   {
  //     const index = this.images.indexOf(image);
  //     this.images.splice(index, 1);
  //     this.allfiles.splice(index, 1);
  //   }
  //   save()
  //   {
  //     console.log(this.allfiles);
  //   }

}
