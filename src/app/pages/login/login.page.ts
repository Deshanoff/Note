import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(


    private router:Router,
    private authServices: AuthenticationService
  ) { }

  ngOnInit() {


  }
  onLogin(form:NgForm){
    if(form.valid){
    this.authServices.SignIn(this.email,this.password).then((result)=>{
      console.log(result);
      console.log(result.user.uid);
      GetuidComponent.uid=result.user.uid;
      if(result.user){
        if(result.user.emailVerified){
        console.log(result.user);
        console.log("sdfebajdkf");
        this.router.navigate(['tabs']);
        this.errorMessage="";
      }
      else{
        this.errorMessage="Confirm Your Email";
      }
    }


    }).catch((err)=>{
      if(err.code=='auth/user-not-found'){
        this.errorMessage="There is no User recod correspond to this email. Please try again";
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
}
