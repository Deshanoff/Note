import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '../model/Note';
import { FirebbaseService } from '../services/firebabse.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  note:Note={
    id:'',
    title:'',
    content:'',
    createAt:''
  };
  constructor(private fbSerice:FirebbaseService,

    private router:Router,
    private activatedRouter : ActivatedRoute) { }

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
  deleteNote(){
    this.fbSerice.deleteNote(this.note.id).then(()=>{
      this.router.navigateByUrl('tabs/my-listing');
    })
  }

}
