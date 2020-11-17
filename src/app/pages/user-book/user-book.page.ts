import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service'
import { Router } from '@angular/router'
import * as moment from 'moment'

@Component({
  selector: 'app-user-book',
  templateUrl: './user-book.page.html',
  styleUrls: ['./user-book.page.scss'],
})
export class UserBookPage implements OnInit {

  reserv: string;
  reserve = {} as Reservation

  date = moment().toDate()


  constructor( private prodService: ProductsService, private rout: Router) { }

  ngOnInit() {
  }

  book(){
    // new Date();
    // this.reserv = Date();

    this.prodService.makeReserv(this.reserve)
  }

  dishes(){
    this.rout.navigateByUrl('restaurant1')
  }

}
