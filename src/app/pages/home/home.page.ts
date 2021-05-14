import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { Note } from 'src/app/model/Note';
import { AuthenticationService } from 'src/app/serices/authentication.service';
import { FirebbaseService } from 'src/app/services/firebabse.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('myInput') myInput: ElementRef;
  note:Note={
    title:'',
    content:'',
    createAt:new Date().getTime()
  };
  constructor(
private auths:AuthenticationService,
private router:Router,
private fbSerice:FirebbaseService,
private ngFireAuth:AngularFireAuth,
public toastCtrl: ToastController

  ) { }

  ngOnInit() {

  }
  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
}
  addNote(){
    this.fbSerice.addNote(this.note).then(()=>{

    }, err=>{

    }
    )


    this.note.title="";
    this.note.content="";
    console.log("Add button clicked");
    this.router.navigateByUrl("tabs/my-listing");
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
