import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { async, Observable } from 'rxjs';
import { Details } from 'src/app/model/Details';
import { Note } from 'src/app/model/Note';
import { AuthenticationService } from 'src/app/serices/authentication.service';
import { FirebbaseService } from 'src/app/services/firebabse.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map, take } from "rxjs/operators";
import { FileService} from 'src/app/services/file.service'
import { GetuidComponent } from 'src/app/model/getuid/getuid.component';
import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user : Observable<Details[]>;
  public notes:Observable<Note[]>;
  public u:string;

  selectedImage: any = null;
  url:string;
  id:string;
  file:string;
  oc:string;
  uploading:string;
  imageuri:string;




  constructor(private auths:AuthenticationService,
    private router:Router,
    private ngFireAuth:AngularFireAuth,
    private afs:AngularFirestore,
    private udtl:UserDetailsService,
    private ff:FirebbaseService,

private storage: AngularFireStorage,private fileService: FileService,
public toastCtrl: ToastController,
public loadingController: LoadingController


    ) {


      this.udtl.ngOnInit();
      console.log("profile page constructor");
      this.user=this.udtl.getNotes();
     this.fileService.getImageDetailList();
      this.uploading="";
     this.user.subscribe(x => x.forEach(p=>{
       this.imageuri=p.imageuri;
     }))

    }


  ngOnInit() {
    this.udtl.ngOnInit();
    console.log("profile page on init");
    this.user=this.udtl.getNotes();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 6000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
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
  delete(downloadUrl) {
    try{
      return this.storage.storage.refFromURL(downloadUrl).delete();
    }catch{
      console.log("no image");
    }

  }
  save() {
    var name = this.selectedImage.name;
    console.log(name);
    this.presentLoading();
    this.uploading="uploading your image please wait";
    this.delete(this.imageuri)
    console.log(" old image deleted");

    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;



          console.log(UserDetailsService.docid);
          this.afs.collection('notes').doc(GetuidComponent.uid).collection('user_details').doc(UserDetailsService.docid).update({
            imageuri:url
          })
        })
        this.uploading="";

      })
    ).subscribe();

  }
  view(){
    this.fileService.getImage(this.file);
  }
  gotoEdit(){
    this.router.navigateByUrl('editpage');
  }
}

function openToast() {
  throw new Error('Function not implemented.');
}
function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

