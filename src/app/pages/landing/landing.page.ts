import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  items: any;

  constructor(private product: ProductsService, private route: Router) { }

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
  }

  open(){
    this.route.navigateByUrl('open-restaurant')
  }

  
  openPro(){
    this.route.navigateByUrl('user-profile')
  }

}
