import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private af: AngularFirestore) { }

  getAgenda() {
    return this.af.collection('agenda')
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

  getPatients() {
    return this.af.collection('patients')
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
  getPatient(id) {
    return this.af.doc(`patients/${id}`)
      .snapshotChanges()
      .pipe(
        map(snap => {
          return <any>{
            id: snap.payload.id,
            ...snap.payload.data()
          }
        })
      );
  }
}
