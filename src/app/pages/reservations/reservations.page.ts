import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service'
import { Location } from '@angular/common';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {

  items: any

  constructor(private product: ProductsService, private location: Location) { }

  ngOnInit() {
    this.product.getReservation().subscribe(data_I => {
      this.items = [];
      data_I.forEach( a => {
        let data: any = a.payload.doc.data();
        data.id = a.payload.doc.id;
        this.items.push(data);
        console.log('uuu: ', this.items)
      })
    })
  }

  prev(){
    this.location.back()
  }

}
