import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  ActionSheetController,
  IonSlides,
  NavController,
} from '@ionic/angular';
import { GetuidComponent } from 'src/app/model/getuid/getuid.component';
import { AuthenticationService } from 'src/app/serices/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 //  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  currentUser;
  email;
  slideOpts = {
    slidesPerView: 1,
    allowTouchMove: false,
  };
  hideResend: boolean;
  registration_form: FormGroup;
  hasVerifideEmail = true;
  stopInterval = false;
  sendTimestamp;
  interval;
  text="";

  constructor(

    private actionSheetController: ActionSheetController,
    private navCtrl: NavController,
    public authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private afs:AngularFirestore,
    private router: Router
  ) {
  //   this.hideResend = false;
  //   this.authService.getUser().subscribe((result) => {
  //     this.currentUser = result;
  //     if (result) {
  //       this.email = result.email;
  //       if (result && result.email && !result.emailVerified) {
  //         console.log('Email not verified');
  //         //this.slides.slideTo(1, 500);
  //       }
  //     }
  //   });
  // }

  }

  sendEmailVerification() {
    this.authService.getUser().subscribe((user) => {
      user.sendEmailVerification().then((result) => {
        this.text="we send confiremation code to your email. Confirem Email and Login";
      });
    });
  }
  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confpassword'].value
      ? null
      : { mismatch: true };
  }
  signUp(value) {
    this.authService
      .RegisterUser(value.email, value.password, value.uname)
      .then((res) => {
        GetuidComponent.uid=res.user.uid;
          this.afs.collection('notes').doc(res.user.uid).collection('user_details').add({
            uname:value.uname
        });
       try {
        this.sendEmailVerification();

       } catch (error) {
         console.log("oh shit");
       }finally{
         this.router.navigate[''];
       }


      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  goNext() {

  }
  back(){
    this.navCtrl.navigateBack("");
  }
  ngOnInit() {

    // this.interval = setInterval(() => {
    //   this.authService.getUser().subscribe((result) => {
    //     this.currentUser = result;
    //     if (this.currentUser) {
    //       this.email = this.currentUser.email;
    //       this.currentUser.reload();
    //       console.log('email', this.currentUser.emailVerified);
    //       AuthenticationService.ev=this.currentUser.emailVerified;
    //       this.hasVerifideEmail = this.currentUser.emailVerified;
    //       if (this.hasVerifideEmail) {
    //         this.stopInterval = true;
    //         clearInterval(this.interval);
    //         this.text="";
    //         this.navCtrl.navigateRoot(['']);
    //       }
    //     }
    //   });
    // },5000);
    // if(this.stopInterval){
    //   clearInterval(this.interval);
    // }














    this.registration_form = this.formBuilder.group(
      {
        email: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
            ),
          ])
        ),
        uname: new FormControl('', Validators.compose([])),
        password: new FormControl(
          '',
          Validators.compose([Validators.minLength(5), Validators.required])
        ),
        confpassword: new FormControl(
          '',
          Validators.compose([Validators.minLength(5), Validators.required])
        ),
      },
      { validator: this.passwordMatchValidator }
    );
  }
}
