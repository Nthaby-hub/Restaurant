import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import {Location } from '@angular/common';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-open-restaurant',
  templateUrl: './open-restaurant.page.html',
  styleUrls: ['./open-restaurant.page.scss'],
})
export class OpenRestaurantPage implements OnInit {

  items: any;
  menu: Array<any> = [];
  id: any;

  constructor(private product: ProductsService, 
    private route: Router,
    private activatedActivated: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.id = this.activatedActivated.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)

    firebase.firestore().collection('rest1').where('eventOwnerId', '==', this.id)
    .onSnapshot(res => {
      res.forEach(doc => {
        this.menu.push(Object.assign(doc.data(), { uid: doc.id}))
        console.log('Menu: ', this.menu)
      })
    })

    // this.product.getMenu().subscribe(data_I => {
    //   this.menu = [];
    //   console.log(this.menu)
    //   data_I.forEach( a => {
    //     let data: any = a.payload.doc.data();
    //     data.id = a.payload.doc.id;
    //     this.menu.push(data);
    //   })
    // })
  }
  
  open(){
    this.route.navigateByUrl('user-book/'+this.id)
  }
  
  prev(){
    this.location.back()
  }



}
