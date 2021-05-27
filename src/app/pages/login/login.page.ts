import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { GetuidComponent } from 'src/app/model/getuid/getuid.component';
import { AuthenticationService } from 'src/app/serices/authentication.service';
import { MyListingsPage } from '../my-listings/my-listings.page';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email='';
  password='';
  errorMessage="";
  loading: any;
  constructor(


    private router:Router,
    private authServices: AuthenticationService,
    public loadingController: LoadingController
  ) {

    this.loading=this.loadingController;

   }

  ngOnInit() {


  }




  onLogin(form:NgForm){
    if(form.valid){
      this.presentLoading(); 
      this.errorMessage="Please Wait";
     this.authServices.SignIn(this.email,this.password).then((result)=>{
      console.log(result);
      console.log(result.user.uid);
      GetuidComponent.uid=result.user.uid;
      if(result.user){
        if(result.user.emailVerified){
        console.log(result.user);
       // console.log("sdfebajdkf");
        this.router.navigate(['tabs']);
        this.errorMessage="";

      }
      else{
        this.errorMessage="Confirm Your Email";
      }
    }


    }).catch((err)=>{
      if(err.code=='auth/user-not-found'){
        this.errorMessage="Please Registor";
      }
      else{
        this.errorMessage=err.message;
      }
    })
  }
}
  registor(){
this.router.navigateByUrl('/register')
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
