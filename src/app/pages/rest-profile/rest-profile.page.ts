import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service'
import { ModalController } from '@ionic/angular'
import { ProfilePage } from '../profile/profile.page'

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rest-profile',
  templateUrl: './rest-profile.page.html',
  styleUrls: ['./rest-profile.page.scss'],
})
export class RestProfilePage implements OnInit {

  userM: any;
  profiles: Array<any> = [];
  userId: string;
  userProfile: firebase.firestore.DocumentData;

  constructor(private product: ProductsService, private router: Router, private location: Location,
     private modalCtrl: ModalController, private authService: AuthService) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log('User - logged in')
        this.userM = this.authService.getSession()
        this.userM = user.uid
        console.log('login USER: ', this.userM)
        console.log()
      
            firebase.firestore().collection('restProfile').where('eventOwnerId', '==', this.userM).onSnapshot(res => {
              res.forEach(element => {
                this.profiles.push(Object.assign(element.data(), { uid: element.id }));
                console.log('PROFILES: ', this.profiles);
                this.userId = { uid: element.id }.uid
                // this.going = element.data().going.length
                console.log('userID: ', this.userId)
    
                firebase.firestore().collection('restProfile').doc(this.userId).get().then((res) => {
                  this.userProfile = res.data();
                  console.log('my - profile: ', this.userProfile)
                });
              });
            });
          }
        })
  }

  editProfile(){
    this.router.navigate(['/edit-rest', this.userId])
  }

  logout() {
    this.authService.logoutRestOwner();
    this.authService.signAuth();
    this.router.navigateByUrl('home')
  }
 
    prev(){
      this.location.back()
    }

}
