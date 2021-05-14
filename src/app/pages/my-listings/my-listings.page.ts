import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Note } from 'src/app/model/Note';
import { AuthenticationService } from 'src/app/serices/authentication.service';
import { AuthenticateService } from 'src/app/services/authentication.service';
import { FirebbaseService } from 'src/app/services/firebabse.service';

@Component({
  selector: 'app-my-listings',
  templateUrl: './my-listings.page.html',
  styleUrls: ['./my-listings.page.scss'],
})
export class MyListingsPage implements OnInit {
  public notes:Observable<Note[]>;
  public backupnote:Observable<Note[]>;
  today:number=  Date.now();

  constructor(private auths:AuthenticationService,
    private router:Router,
    private ngFireAuth:AngularFireAuth,
    private fbSerice:FirebbaseService,
              private fbauth:AuthenticateService

    ) {
    }

  ngOnInit() {

    this.fbSerice.ngOnInit();
    this.notes=this.fbSerice.getNotes();
    console.log("my listing loadeed");

  }

  static loadit(){

  }
  signout(){
    this.ngFireAuth.authState.subscribe(user=>{
      if(user){

        localStorage.setItem('user',JSON.stringify(user));
      }

    })

    this.auths.Signout();
    this.router.navigate(['']);

  }
}
