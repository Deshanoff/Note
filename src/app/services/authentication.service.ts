// authentication.service.ts
import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from "@ionic/angular";

import '@firebase/auth';
import {firebase} from '@firebase/app';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private router : Router
//dsfsdfsdf

  ) { }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {

      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))

    });

  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))

    })
  }

  public async signout(): Promise<any> {


    try {
      this.router.navigateByUrl('');

      return await this.afAuth.signOut();

    } catch (e) {
      console.error("big hu?", e);
    }


  }

  userDetails() {
    return this.afAuth.user;
  }
}
