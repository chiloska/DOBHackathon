import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router
  ) { }

  getMessages() {
    return this.afs
      .collection('messages')
      .snapshotChanges()
      .pipe(
        map(snaps => {
          return snaps.map(snap => {
            return <any>{
              id: snap.payload.doc.id,
              ...snap.payload.doc.data()
            }
          });
        })
      );
  }

}
