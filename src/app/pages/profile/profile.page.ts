import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Details } from 'src/app/model/Details';
import { Note } from 'src/app/model/Note';
import { AuthenticationService } from 'src/app/serices/authentication.service';
import { FirebbaseService } from 'src/app/services/firebabse.service';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user : Observable<Details[]>;
  public notes:Observable<Note[]>;
  public u:string;
  constructor(private auths:AuthenticationService,
    private router:Router,
    private ngFireAuth:AngularFireAuth,
    private afs:AngularFirestore,
    private udtl:UserDetailsService,
    private ff:FirebbaseService) { this.udtl.ngOnInit();
      console.log("lllalad");
      this.user=this.udtl.getNotes(); }

  ngOnInit() {
    this.udtl.ngOnInit();
    console.log("lllalad");
    this.user=this.udtl.getNotes();
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
