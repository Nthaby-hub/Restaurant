import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import {Location } from '@angular/common';

@Component({
  selector: 'app-open-restaurant',
  templateUrl: './open-restaurant.page.html',
  styleUrls: ['./open-restaurant.page.scss'],
})
export class OpenRestaurantPage implements OnInit {

  items: any;
  menu: any;

  constructor(private product: ProductsService, private route: Router,private location: Location) { }

  ngOnInit() {
    this.product.getRestaurant().subscribe(data_I => {
      this.items = [];
      console.log(this.items)
      data_I.forEach( a => {
        let data: any = a.payload.doc.data();
        data.id = a.payload.doc.id;
        this.items.push(data);
      })
    })

    this.product.getMenu().subscribe(data_I => {
      this.menu = [];
      console.log(this.menu)
      data_I.forEach( a => {
        let data: any = a.payload.doc.data();
        data.id = a.payload.doc.id;
        this.menu.push(data);
      })
    })
  }
  
  open(){
    this.route.navigateByUrl('user-book')
  }

  openR(){
    this.route.navigateByUrl('restaurant1')
  }

  
  prev(){
    this.location.back()
  }



}
