import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { auth } from 'firebase'
import * as firebase from 'firebase/app';
import 'firebase/firebase-auth';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { Observable,of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ : Observable<any>;

  constructor(private afauth: AngularFireAuth,private afs: AngularFirestore, private router : Router, private udata : DataService) {
    this.user$ = this.afauth.authState.pipe(      
      switchMap(user => {
        if(user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })      
    )
   }
   
   async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try{
      const credentials = await this.afauth.signInWithPopup(provider);
      this.updateUserData(credentials.user);
      return credentials.user;
    }catch(e){
    }
  }

  async facebookSignin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    try{
      const credentials = await this.afauth.signInWithPopup(provider);
      this.updateUserData(credentials.user);
      return  credentials.user;
    }catch(e){
      console.log(`Error occured! ${e}`);
    }
  }

  async twitterSignin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    try{
      const credentials = await this.afauth.signInWithPopup(provider);
      this.updateUserData(credentials.user);
      return credentials.user;
    }catch(e){
      console.log(`Error occured! ${e}`);
    }
  }

  async signOut() {
    await this.afauth.signOut();
    this.udata.resetObjects();
    this.udata.nlist = new Array();
    this.udata.journal = new Array();
    return this.router.navigate(['/']);
  }

  private updateUserData(user : User){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    // console.log(`UPADATING USER DATA - ${this.udata.dateofBirth} & ${this.udata.name}`);
    let uname = "";
    let dob = "";
    let data : any;
    if(this.udata.dateofBirth!="" && this.udata.name!="")
    {
      console.log(` - ${this.udata.dateofBirth} & ${this.udata.name}`);
      data = {
        uid: user.uid,
        email: user.email, 
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: user.providerId,
        last_update_date: ""+Date.now(),
        dateofBirth : this.udata.dateofBirth,
        avatar : this.udata.name     
      }
      
    }else{
      data = {
        uid: user.uid,
        email: user.email, 
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: user.providerId,
        last_update_date: ""+Date.now()      
      }
    }
      
    return userRef.set(data, { merge : true });
  }

  async updateData(user : User){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    
    let data : any;
    if(this.udata.dateofBirth!="" && this.udata.name!="")
    {
      data = {
        uid: user.uid,
        email: user.email, 
        displayName: user.displayName,
        photoURL: user.photoURL,
        last_update_date: ""+Date.now(),
        dateofBirth : this.udata.dateofBirth,
        avatar : this.udata.name,
        journal :  JSON.parse(JSON.stringify(this.udata.journal)),
        nlist :  JSON.parse(JSON.stringify(this.udata.nlist))
      }
    }else{
    
      console.log('Incorrect data!')
    }
      
    return userRef.set(data, { merge : true });
  }

  async editDetail(user : User){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    
    let data : any;
    if(this.udata.dateofBirth!="" && this.udata.name!="")
    {
      data = {
        uid: user.uid,
        dateofBirth : this.udata.dateofBirth,
        avatar : this.udata.name
      }
    }else{
    
      console.log('Incorrect data!')
    }
      
    return userRef.update(data);
  }


}
