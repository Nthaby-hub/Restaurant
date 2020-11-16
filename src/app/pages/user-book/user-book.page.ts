import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service'

@Component({
  selector: 'app-user-book',
  templateUrl: './user-book.page.html',
  styleUrls: ['./user-book.page.scss'],
})
export class UserBookPage implements OnInit {

  reserv: string;
  reserve = {} as Reservation

  constructor( private prodService: ProductsService) { }

  ngOnInit() {
  }

  book(){
    // new Date();
    // this.reserv = Date();

    this.prodService.makeReserv(this.reserve)
  }

}
