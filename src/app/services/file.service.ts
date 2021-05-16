import { Injectable, Inject } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class FileService {
  imageDetailList: AngularFireList<any>;
  fileList: any[];
  dataSet: Data = {

    url:''
  };
  msg:string = 'error';
  constructor(private firebase: AngularFireDatabase) { }
  getImageDetailList() {
    this.imageDetailList = this.firebase.list('imageDetails');
  }
  insertImageDetails(id,url) {

    this.imageDetailList.push(this.dataSet);
  }
  getImage(value){
    this.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.fileList = list.map(item => { return item.payload.val();  });
        this.fileList.forEach(element => {
          if(element.id===value)
          this.msg = element.url;
        });
        if(this.msg==='error')
          alert('No record found');
        else{
          window.open(this.msg);
          this.msg = 'error';
        }
      }
    );
  }
}
export interface Data{
  url:string;
}
