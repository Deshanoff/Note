import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Note } from '../model/Note';
import { AuthenticationService } from '../serices/authentication.service';
import { FirebbaseService } from '../services/firebabse.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.page.html',
  styleUrls: ['./update-note.page.scss'],
})
export class UpdateNotePage implements OnInit {
  @ViewChild('myInput') myInput: ElementRef;
  note:Note={
    title:'',
    content:'',
    createAt:new Date().getTime()
  };
  constructor(private activatedRoute:ActivatedRoute,
    private fbSerice:FirebbaseService,
    private toastCtrl:ToastController,
    private router:Router,
    private activatedRouter : ActivatedRoute,
    private ngFireAuth:AngularFireAuth,
    private auths:AuthenticationService
    ) { }

  ngOnInit() {
  }
  ngAfterViewInit():void{
    const id =this.activatedRouter.snapshot.paramMap.get('id');
    if(id){
      this.fbSerice.getNote(id).subscribe(notedata=>{
        this.note=notedata;
      })
    }
  }
  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
}
  UpdateNote(){
    this.fbSerice.updateNote(this.note).then(()=>{
      console.log("edfgesaf");
      this.router.navigate(['tabs/my-listing']);
    },err=>{

    });
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
  back(){
    this.router.navigate(['tabs/home']);
  }
}


