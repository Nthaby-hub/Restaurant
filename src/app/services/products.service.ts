import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private storage: AngularFireStorage, private afs: AngularFirestore) { }

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  private itemCount = new BehaviorSubject(0);

  getCart(){
    return this.afs.collection('cart').snapshotChanges();
  }

  getRestaurant(){
    return this.afs.collection('restProfile').snapshotChanges();
  }

  getItemCount(){
    return this.itemCount;
  }

  getMenu(){
    return this.afs.collection('rest1').snapshotChanges();
  }

  addFood(prod){
    this.afs.collection('rest1').add(prod).then(() =>{
      alert("Successfully added")
    }).catch(err => {
      alert(err.message + " Unable to add")
    })
  }

  deleteFood(prod){
    this.afs.collection('rest1').doc(prod).delete().then(() => {
      
    }).catch(err => {
      alert(err.message + ' Could not delete')
    })
  }

  updateFood(food){
    this.afs.collection('rest1').doc(food.key).update(food) 
  }

  deleteReservation(res){
    this.afs.collection('Reservations').doc(res).delete().then(() => {
      
    }).catch(err => {
      alert(err.message + ' Could not delete')
    })
  }

  //Upload file
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'seafood/'+ this.generateID(6)+'';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }
  
  generateID(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 getFile(){
   return this.afs.collectionGroup('rest1').snapshotChanges();
 }

 makeReserv(user){
  this.afs.collection('Reservations').add(user).then(() =>{
    alert("Information submited")
  }).catch(err => {
    alert(err.message + " Unable to submit")
  })
 }

 getReservation(){
   return this.afs.collection('Reservations').snapshotChanges()
 }

 addProfile(profile){
   this.afs.collection('restProfile').add(profile).then(() => {
     alert('Profile saved Successfully')
   }).catch(err => {
     alert(err.message + " Unable to save profile")
   })
 }

 getProfile(){
   return this.afs.collection('restProfile').snapshotChanges()
 }

 getUser(){
  return this.afs.collection('UserProfile').snapshotChanges()
 }

 
}
