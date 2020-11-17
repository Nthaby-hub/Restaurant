import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service'
import { CartPage } from '../cart/cart.page'
import { ModalController } from '@ionic/angular'
import { Router } from '@angular/router'
import {Location } from '@angular/common';

@Component({
  selector: 'app-restaurant1',
  templateUrl: './restaurant1.page.html',
  styleUrls: ['./restaurant1.page.scss'],
})
export class Restaurant1Page implements OnInit {

  items = [];
  itemCount: BehaviorSubject<number>;

  constructor(private product: ProductsService, private modalCtrl: ModalController, private rout: Router, private location: Location) { }

  ngOnInit() {
    this.product.getMenu().subscribe(data_I => {
      this.items = [];
      data_I.forEach( a => {
        let data: any = a.payload.doc.data();
        data.id = a.payload.doc.id;
        this.items.push(data);
      })
    })

    this.itemCount = this.product.getItemCount();
  }

  addToCart(prod){
    this.product.addFood(prod);
  }

  async openCart() {
    // this.animateCSS('bounceOutLeft', true);

    const modal = await this.modalCtrl.create({
      component: CartPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      // this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
      // this.animateCSS('bounceInLeft');
    });
    modal.present();
  }

  prev(){
    this.location.back()
  }

}
