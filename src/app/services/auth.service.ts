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

  constructor(private afa: AngularFireAuth, private afStore: AngularFirestore, private router: Router) {
    this.afa.authState.subscribe(user => {
      if (user) {
        this.authState = user;
        localStorage.setItem('user', JSON.stringify(this.authState));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
   }

   signAuth(){
    return firebase.auth().onAuthStateChanged(user => {
      if(user){
        console.log('User logged in: ', user);
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

   loginEmail(email,password){
    return this.afa.signInWithEmailAndPassword(email,password)
   }

  //  GoogleAuth() {
  //   return this.AuthLogin(new GoogleAuthProvider());
  // }

  registerUser(email, password){
    return this.afa.createUserWithEmailAndPassword(email,password)
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
