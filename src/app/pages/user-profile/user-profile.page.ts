import { Component, OnInit } from '@angular/core';
import {Location } from '@angular/common';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  userM: any;
  profiles: Array<any> = [];
  userId: string;
  userProfile: firebase.firestore.DocumentData;

  constructor(private prodService: ProductsService, private rout: Router,
    private location: Location, private authService: AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log('User - logged in')
        this.userM = this.authService.getSession()
        this.userM = user.uid
        console.log('login USER: ', this.userM)
        console.log()
      
            firebase.firestore().collection('UserProfile').where('userId', '==', this.userM).onSnapshot(res => {
              res.forEach(element => {
                this.profiles.push(Object.assign(element.data(), { uid: element.id }));
                console.log('PROFILES: ', this.profiles);
                this.userId = { uid: element.id }.uid
                // this.going = element.data().going.length
                console.log('userID: ', this.userId)
    
                firebase.firestore().collection('UserProfile').doc(this.userId).get().then((res) => {
                  this.userProfile = res.data();
                  console.log('my - profile: ', this.userProfile)
                });
              });
            });
          }
        })
  }

  editProfile(){
    this.rout.navigate(['/edit-user', this.userId])
  }

  openR(){
    this.rout.navigateByUrl('restaurant1')
  }

  logout(){
    this.authService.logoutRestOwner();
    this.authService.signAuth();
    this.rout.navigateByUrl('home')
  }

  prev(){
    this.location.back()
  }

}
