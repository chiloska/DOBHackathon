import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, tap, first } from 'rxjs/operators';


import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) { }

  isLogginActive(): Observable<any> {
    return this.afAuth.authState.pipe(
      take(1),
      map((authState) => !!authState),
      tap(authenticated => {
        if (!authenticated) { this.router.navigate(['/login']); }
      })
    );
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }

  emailLogin(user: any) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      console.log('Logout');
      this.router.navigate(['/login']);
    });
  }

  getUser() {
    return this.afAuth.user;
  }

  getchatUser() {
    return this.user$.pipe(first()).toPromise();
  }
}
