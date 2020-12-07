import { Component, OnInit } from '@angular/core';
import {Location } from '@angular/common';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  user:any;

  constructor(private prodService: ProductsService, private rout: Router,
    private location: Location) { }

  ngOnInit() {
    this.prodService.getUser().subscribe(data_I => {
      this.user = [];
      data_I.forEach( a => {
        let data: any = a.payload.doc.data();
        data.id = a.payload.doc.id;
        this.user.push(data);
      })
    })
  }

  prev(){
    this.location.back()
  }

}
