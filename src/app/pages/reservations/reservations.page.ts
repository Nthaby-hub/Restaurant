import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service'
import { Location } from '@angular/common';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {

  items: Array<any> = []
  restId: any;

  constructor(private product: ProductsService,
     private location: Location,
     private authService: AuthService) { }

  ngOnInit() {

    const user = firebase.auth().currentUser
    console.log("user: ",user)

    firebase.auth().onAuthStateChanged((users) => {
      if(users){
        this.restId = this.authService.getSession()
        this.restId = user.uid

        console.log('restaurant id: ',this.restId)

        firebase.firestore().collection('Reservations').where("id", "==", this.restId)
        .onSnapshot(res => {
          res.forEach(doc => {
            this.items.push(Object.assign(doc.data(), {uid: doc.id}))
            console.log('Products: ', this.items)
          })
        })
      }
    })

  }

  deleteFood(id){
    this.product.deleteReservation(id)
  }

  prev(){
    this.location.back()
  }

}
