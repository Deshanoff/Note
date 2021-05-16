import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Note} from '../model/Note';
import {map, take} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import { getLocaleMonthNames } from '@angular/common';
import {firebase} from '@firebase/app';
import '@firebase/auth';

import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';


import { GetuidComponent } from '../model/getuid/getuid.component';
import { Data } from './file.service';
@Injectable({
  providedIn: 'root'
})
export class FirebbaseService {
  public  static notes : Observable<Note[]>;
  public noteCollection:AngularFirestoreCollection<Note>;

  constructor(private afs:AngularFirestore,

    private navCtrl: NavController
    ) {
    //getUid.uid=firebase.auth().currentUser.uid;
    console.log("addpage " + GetuidComponent.uid);
    //define collection
    //this.noteCollection=this.afs.collection<Note>('notes');
    this.noteCollection=this.afs.collection('notes').doc(GetuidComponent.uid).collection<Note>('data');

    //get collection data
    FirebbaseService.notes=this.noteCollection.snapshotChanges().pipe(
      map(action=>{
        return action.map(a=>{
          //get other datat
          const data=a.payload.doc.data();
          //get key
          const id=a.payload.doc.id;
          console.log(id);
          //return
          return {id,...data};
        });
      })
    );




  }
  ngOnInit() {
  }
  addimageData(url:string){
    this.afs.collection('notes').doc(GetuidComponent.uid).update({
      url:url
    })
  }
  getimageUri(){
    return this.afs.collection('notes').doc<Data>(GetuidComponent.uid).valueChanges().pipe(
      take(1),
      map(note=>{
        return note.url;
      })
    )
  }


  //getting all notes
  getNotes(): Observable<Note[]>{
      return FirebbaseService.notes;
  }

  //get single note by id
  getNote(id:string):Observable<Note>{
    return this.noteCollection.doc<Note>(id).valueChanges().pipe(
      take(1),
      map(note=>{
        note.id=id;
        return note;
      })
    )
  }

  //create new note
  addNote(note:Note):Promise<DocumentReference>{
    console.log("adding to firebase");
    return this.noteCollection.add(note);
  }

  updateNote(note : Note):Promise<void>{
    return this.noteCollection.doc(note.id).update(
      {
        title:note.title,
        content:note.content,
        createAt:note.createAt
      }
    );
  }


  deleteNote(id:string):Promise<void>{
    return this.noteCollection.doc(id).delete();
  }


}
