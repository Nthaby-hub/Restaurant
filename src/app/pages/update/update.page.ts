import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service'
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  items: any;

  constructor( private product: ProductsService, private modalCtrl: ModalController) { }

  ngOnInit() {
   
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
