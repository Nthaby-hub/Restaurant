import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service'
import { ActivatedRoute, Router } from '@angular/router'
import * as moment from 'moment'
import {Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { AlertController} from '@ionic/angular';

@Component({
  selector: 'app-user-book',
  templateUrl: './user-book.page.html',
  styleUrls: ['./user-book.page.scss'],
})
export class UserBookPage implements OnInit {

  reserv: string;
  reserve = {} as Reservation

  date = moment().toDate()
  reservation: FormGroup
  userId: any;
  bookId: any;
  id: any;
  details: any;
  username: any;

  constructor( private prodService: ProductsService, private rout: Router,
    private location: Location, private fb: FormBuilder,
    private alertCtrl: AlertController,
    // private navParams: NavParams,
    private activatedActivated: ActivatedRoute) { }

  ngOnInit() {
    this.addDish();

    const user = firebase.auth().currentUser
    this.userId = user.uid
    console.log('User Id: ', this.userId)

    this.id = this.activatedActivated.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)
    
  }

  addDish(){
    this.reservation = this.fb.group({
      // name: ['', Validators.required],
      people: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      child: ['']
    });
  }

  async bookReservation(){

    const alert = await this.alertCtrl.create({

      message: `Successfully booked a table.`,
      buttons: [
        {
          text: 'Okay',
          handler: () => {

            const user = firebase.auth().currentUser
            this.userId = user.uid
            console.log('User Id: ', this.userId)

            this.id = this.activatedActivated.snapshot.paramMap.get('id')
            console.log('ID: ', this.id)

            firebase.firestore().collection('UserProfile').doc(this.userId).get().then((res) => {
              this.details = res.data();
              console.log('User details: ', this.details)
              this.username = res.get('Name');
            
              firebase.firestore().collection('Reservations').add({
                userId: this.userId,
                name: this.username,
                people: this.reservation.value.people,
                date: this.reservation.value.date,
                time: this.reservation.value.time,
                child: this.reservation.value.child,
                id: this.id,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              }).then((doc) => {

                doc.set({ bookId: doc.id }, { merge: true }).then(() => {
                  console.log('Book id: ', this.bookId)
                })

                this.reservation.reset();
              }).catch(function(error){
                console.log(error)
              });
            })
          },
        },
      ]

    });
    return await alert.present();

  }

  book(){
    this.prodService.makeReserv(this.reserve)
  }

  dishes(){
    this.rout.navigateByUrl('restaurant1')
  }
  logout(){
    this.rout.navigateByUrl('login')
  }

  prev(){
    this.location.back()
  }

  isDisplay = true;
  toggleDisplay() {
    if(this.isDisplay == true){
      this.isDisplay = false;
    }else{
      this.isDisplay = true;
    }
    
  }

}
