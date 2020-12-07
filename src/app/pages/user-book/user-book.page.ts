import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service'
import { Router } from '@angular/router'
import * as moment from 'moment'
import {Location } from '@angular/common';

@Component({
  selector: 'app-user-book',
  templateUrl: './user-book.page.html',
  styleUrls: ['./user-book.page.scss'],
})
export class UserBookPage implements OnInit {

  reserv: string;
  reserve = {} as Reservation

  date = moment().toDate()


  constructor( private prodService: ProductsService, private rout: Router,private location: Location) { }

  ngOnInit() {
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

}
