import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cart = []
  priceAmnt: any;

  constructor(private product: ProductsService) { }

  ngOnInit() {
    this.product.getCart().subscribe(data_I => {
      this.cart = [];
      data_I.forEach( a => {
        let data: any = a.payload.doc.data();
        data.id = a.payload.doc.id;
        this.cart.push(data);
      })
    })
  }

  deleteProduct(product){
    this.product.deleteFood(product)
  }

  getTotal(){
    this.priceAmnt = this.cart.reduce((i,j) => i + j.price * j.amount, 0);
    return this.priceAmnt;
  }

}
