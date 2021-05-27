import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Details } from 'src/app/model/Details';
import { FirebbaseService } from 'src/app/services/firebabse.service';

@Component({
  selector: 'app-editpage',
  templateUrl: './editpage.page.html',
  styleUrls: ['./editpage.page.scss'],
})
export class EditpagePage implements OnInit {
  registration_form: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private fbSerice:FirebbaseService,
    public router:Router
  ) { }

  ngOnInit() {
    this.registration_form = this.formBuilder.group(
      {

        fname: new FormControl('', Validators.compose([])),
        lname: new FormControl('', Validators.compose([])),
        pnum: new FormControl('', Validators.compose([]))

      },

    );
  }
  update(value){
    this.fbSerice.updateProfile(value.fname, value.lname, value.pnum);
    console.log("update successfull");
    this.router.navigateByUrl('tabs/profile');
  }

}
