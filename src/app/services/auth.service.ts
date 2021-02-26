import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import {Router } from '@angular/router'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any;
  userUID: any;

  constructor() {}

   signAuth(){
    return firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.setSession(user.uid)
        console.log('User logged in: ', this.getSession());
      }else{
        console.log('User logged out:');
      }
    });
  }

   
   signupRestOwner(email, password){
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  //signin owner
  signinRestOwner(email, password){
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  //reset owner password
  resetPassword(email){
    return firebase.auth().sendPasswordResetEmail(email);
  }

  //logout owner
  logoutRestOwner(){
    return firebase.auth().signOut();
  }

  setSession(x){
    this.userUID = x;
  }

  getSession(){
    return this.userUID
  }  
  // Auth providers
  // AuthLogin(provider) {
  //   return this.afa.auth.signInWithPopup(provider)
  //   .then((result) => {
  //      this.ngZone.run(() => {
  //         this.router.navigate(['dashboard']);
  //       })
  //     this.SetUserData(result.user);
  //   }).catch((error) => {
  //     window.alert(error)
  //   })
  // }

  // // Store user in localStorage
  // SetUserData(user) {
  //   const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified
  //   }
  //   return userRef.set(userData, {
  //     merge: true
  //   })
  // }

  // // Sign-out 
  // SignOut() {
  //   return this.afa.auth.signOut().then(() => {
  //     localStorage.removeItem('user');
  //     this.router.navigate(['login']);
  //   })
  // }
}
