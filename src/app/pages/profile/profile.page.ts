import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service'
import { ModalController } from '@ionic/angular'
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileForm: FormGroup;
  isSubmitted: boolean = false;
  eventOwnerId: any;
  company: string;

  set = {}

  //old
  Items: any;
  title = 'khumalo3';
  images: any =[];
  allfiles: any =[];
  profile = {} as Profiling;

  constructor( private product: ProductsService, private modalCtrl: ModalController,
    private fb: FormBuilder, private rout: Router) { 
      this.company = localStorage.getItem('companyName')
    }

  ngOnInit() {
   this.saveProfile()
  }
  
  saveProfile() {
    this.profileForm = this.fb.group({
      clientCode: ['', Validators.required],
      companyName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.0]+.[a-zA-Z]{2,4}$')]],
      website: ['', Validators.required]
    });
  }

  get clientCode() {
    return this.profileForm.get("clientCode");
  }

  get companyName() {
    return this.profileForm.get("companyName");
  }

  get address() {
    return this.profileForm.get("address");
  }

  get email() {
    return this.profileForm.get("email");
  }
  
  get phone() {
    return this.profileForm.get("phone");
  }

  get website() {
    return this.profileForm.get("website");
  }

  async companyProf() {

    //const loading = await this.loadingCtrl.create();

    const user = firebase.auth().currentUser;
    this.eventOwnerId = user.uid;

    firebase.firestore().collection('restProfile').doc(this.eventOwnerId).set({
      eventOwnerId: this.eventOwnerId,
      clientCode: this.profileForm.value.clientCode,
      companyName: this.profileForm.value.companyName,
      address: this.profileForm.value.address,
      phone: this.profileForm.value.phone,
      email: this.profileForm.value.email,
      website: this.profileForm.value.website
    }).then(() => {
      // loading.dismiss().then(() => {
        this.rout.navigateByUrl('/dashboard');
        this.profileForm.reset();
      // })
    },
      error => {
        // loading.dismiss().then(() => {
          console.log(error)
        // })
      }
    );

    // return await loading.present();
  }

  //old
  // saveProfile(){
  //   this.product.addProfile(this.profile)
  // }


  close(){
    this.modalCtrl.dismiss();
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
