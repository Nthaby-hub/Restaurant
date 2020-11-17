import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service'
import { ModalController } from '@ionic/angular'
import { UpdatePage } from '../update/update.page'

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.page.html',
  styleUrls: ['./dishes.page.scss'],
})
export class DishesPage implements OnInit {

  items: any;
  food = {} as Foods

  constructor( private product: ProductsService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.product.getMenu().subscribe(data_I => {
      this.items = [];
      data_I.forEach( a => {
        let data: any = a.payload.doc.data();
        data.id = a.payload.doc.id;
        this.items.push(data);
      })
    })
  }

  addFood(){
    this.product.addFood(this.food)
  }

  deleteFood(id){
    this.product.deleteFood(id)
  }

  insertFile(event){
    this.product.uploadFile(event)
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: UpdatePage,
      cssClass: ''
    });
    return await modal.present();
  }


}
