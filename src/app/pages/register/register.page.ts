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
  LoadingController,
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
    private router: Router,
    public loadingController: LoadingController
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
    this.presentLoading();
    this.authService.getUser().subscribe((user) => {
      user.sendEmailVerification().then((result) => {
        this.text="Confirm Email And Login";
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
      .RegisterUser(value.email, value.password, value.fname, value.lname, value.pnum)
      .then((res) => {
        GetuidComponent.uid=res.user.uid;
          this.afs.collection('notes').doc(GetuidComponent.uid).collection('user_details').add({
            fname:value.fname,
            lname:value.lname,
            pnum:value.pnum

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
        fname: new FormControl('', Validators.compose([])),
        lname: new FormControl('', Validators.compose([])),
        pnum: new FormControl('', Validators.compose([])),
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
