import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service'
import { ModalController } from '@ionic/angular'
import { UpdatePage } from '../update/update.page'
import { Location } from '@angular/common';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.page.html',
  styleUrls: ['./dishes.page.scss'],
})
export class DishesPage implements OnInit {

  items: any;
  Items: any;
  title = 'khumalo3';
  images: any =[];
  allfiles: any =[];

  constructor( private product: ProductsService, private modalCtrl: ModalController, private location: Location) { }

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

  deleteFood(id){
    this.product.deleteFood(id)
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: UpdatePage,
      cssClass: ''
    });
    return await modal.present();
  }

  prev(){
    this.location.back()
  }

  fileuploads(event)
    {
        const files = event.target.files;
        console.log(files);
        if(files)
        {
          for (let i = 0; i <  files.length; i++){
            const image={
              name : '',
              type : '',
              size : '',
              url : ''
            };
            this.allfiles.push(files[i]);
            image.name = files[i].name;
            image.type = files[i].type;
            const size = files[i].size / 1000;
            const mbc = size + '';
            const mb = mbc.split('.')[0];
            const length = mb.length;
              if(length === 4 || length === 5)
              {
                const mbsize = size /1000;
                const splitdata = mbsize + '';
                const splitvalues = splitdata.split('.');
                let secondaryvariable ='';
                for(let j=0; j < splitvalues.length;j++)
                {
                  if(j===1)
                  {
                    secondaryvariable = splitvalues[j].slice(0,2);
                  }
                }
                image.size = splitvalues[0] + '.' + secondaryvariable + 'MB'
              }else{
                const splitdata = size + '';
                const splitvalues = splitdata.split('.');
                let secondaryvariable ='';
                for(let j=0; j < splitvalues.length;j++)
                {
                  if(j===1)
                  {
                    secondaryvariable = splitvalues[j].slice(0,2);
                  }
                }
                image.size = splitvalues[0] + '.' + secondaryvariable + 'KB'
              }
            const reader = new FileReader();
            reader.onload = (filedata)=>{
              image.url = reader.result + '';
              this.images.push(image);
            };
            reader.readAsDataURL(files[i]);
          }
        }
          event.srcElement.value = null;
    }
    deleteImage(image: any)
    {
      const index = this.images.indexOf(image);
      this.images.splice(index, 1);
      this.allfiles.splice(index, 1);
    }
    save()
    {
      console.log(this.allfiles);
    }

}
