import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service'

@Component({
  selector: 'app-rest-profile',
  templateUrl: './rest-profile.page.html',
  styleUrls: ['./rest-profile.page.scss'],
})
export class RestProfilePage implements OnInit {

  profile = {} as Profiling;
  items: any;

  constructor(private product: ProductsService) { }

  ngOnInit() {
    this.product.getProfile().subscribe(data_I => {
      this.items = [];
      data_I.forEach( a => {
        let data: any = a.payload.doc.data();
        data.id = a.payload.doc.id;
        this.items.push(data);
      })
    })
  }

  saveProfile(){
    this.product.addProfile(this.profile)
  }

  insertFile(event){
    this.product.uploadFile(event)
  }

}
