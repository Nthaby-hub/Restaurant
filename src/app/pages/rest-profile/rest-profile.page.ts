import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service'
import { ModalController } from '@ionic/angular'
import { ProfilePage } from '../profile/profile.page'

@Component({
  selector: 'app-rest-profile',
  templateUrl: './rest-profile.page.html',
  styleUrls: ['./rest-profile.page.scss'],
})
export class RestProfilePage implements OnInit {

  items: any;

  Items: any;
  title = 'khumalo3';
  images: any =[];
  allfiles: any =[];

  constructor(private product: ProductsService, private location: Location, private modalCtrl: ModalController) { }

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

  insertFile(event){
    this.product.uploadFile(event)
  }

  async addProfile(){
    const modal = await this.modalCtrl.create({
      component: ProfilePage,
      cssClass: ''
    });
    return await modal.present();
  }
  //banele
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

    prev(){
      this.location.back()
    }

}
