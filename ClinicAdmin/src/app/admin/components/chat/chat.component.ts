import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../../services/auth.service';
import { ChatService } from '../../../services/chat.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import * as firebase from 'firebase';

const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';
const PROFILE_PLACEHOLDER_IMAGE_URL = '/assets/images/profile_placeholder.png';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user: Observable<firebase.User>;
  currentUser: firebase.User;
  messages: Observable<any[]>;
  profilePicStyles: {};
  topics = '';
  value = '';
  private itemsCollection: AngularFirestoreCollection<any>;
  constructor(
    public afs: AngularFirestore, public auth: AuthService, public snackBar: MatSnackBar, public chat: ChatService
  ) {
    this.itemsCollection = afs.collection<any>('messages');
  }

  ngOnInit() {
    this.auth.getUser().subscribe(res => {
      this.currentUser = res;
    }, err => {
      console.log(err);
    });


    this.chat.getMessages().subscribe((res: any) => {
      this.messages = res;
    })
  }

  update(value: string) {
    this.value = value;
  }

  checkSignedInWithMessage() {
    debugger;
    // Return true if the user is signed in Firebase
    if (this.currentUser) {
      return true;
    }

    return false;
  };

  saveMessage(event: any, el: HTMLInputElement) {
    debugger;
    event.preventDefault();

    if (this.value && this.checkSignedInWithMessage()) {
      // Add a new message entry to the Firebase Database.
      const message = {
        name: this.currentUser.displayName,
        text: this.value,
        photoUrl: this.currentUser.photoURL || PROFILE_PLACEHOLDER_IMAGE_URL
      };

      this.itemsCollection.add(message).then(res => {
        el.value = '';
      }).catch(err => {
        this.snackBar.open('Error writing new message to Firebase Database.', null, {
          duration: 5000
        });
        console.error(err);
      });


      // const messages = this.db.collection('/messages');
      // messages.push({
      //   name: this.currentUser.displayName,
      //   text: this.value,
      //   photoUrl: this.currentUser.photoURL || PROFILE_PLACEHOLDER_IMAGE_URL
      // }).then(() => {
      //   // Clear message text field and SEND button state.
      //   el.value = '';
      // }, (err) => {
      //   this.snackBar.open('Error writing new message to Firebase Database.', null, {
      //     duration: 5000
      //   });
      //   console.error(err);
      // });
    } else {
      alert('Unable to Send Data');
    }
  }

  // saveImageMessage(event: any) {
  //   event.preventDefault();
  //   const file = event.target.files[0];

  //   // Clear the selection in the file picker input.
  //   const imageForm = <HTMLFormElement>document.getElementById('image-form');
  //   imageForm.reset();

  //   // Check if the file is an image.
  //   if (!file.type.match('image.*')) {
  //     this.snackBar.open('You can only share images', null, {
  //       duration: 5000
  //     });
  //     return;
  //   }

  //   // Check if the user is signed-in
  //   if (this.checkSignedInWithMessage()) {

  //     // We add a message with a loading icon that will get updated with the shared image.
  //     const messages = this.db.list('/messages');
  //     messages.push({
  //       name: this.currentUser.displayName,
  //       imageUrl: LOADING_IMAGE_URL,
  //       photoUrl: this.currentUser.photoURL || PROFILE_PLACEHOLDER_IMAGE_URL
  //     }).then((data) => {
  //       // Upload the image to Cloud Storage.
  //       const filePath = `${this.currentUser.uid}/${data.key}/${file.name}`;
  //       return firebase.storage().ref(filePath).put(file)
  //         .then((snapshot) => {
  //           // Get the file's Storage URI and update the chat message placeholder.
  //           const fullPath = snapshot.metadata.fullPath;
  //           const imageUrl = firebase.storage().ref(fullPath).toString();
  //           return firebase.storage().refFromURL(imageUrl).getMetadata();
  //         }).then((metadata) => {
  //           // TODO: Instead of saving the download URL, save the GCS URI and
  //           //       dynamically load the download URL when displaying the image
  //           //       message.
  //           return data.update({
  //             imageUrl: metadata.downloadURLs[0]
  //           });
  //         });
  //     }).then(console.log, (err) => {
  //       this.snackBar.open('There was an error uploading a file to Cloud Storage.', null, {
  //         duration: 5000
  //       });
  //       console.error(err);
  //     });
  //   }
  // }

  onImageClick(event: any) {
    event.preventDefault();
    document.getElementById('mediaCapture').click();
  }

  saveMessagingDeviceToken() {
    return firebase.messaging().getToken()
      .then((currentToken) => {
        if (currentToken) {
          console.log('Got FCM device token:', currentToken);
          // Save the Device Token to the datastore.
          firebase.database()
            .ref('/fcmTokens')
            .child(currentToken)
            .set(this.currentUser.uid);
        } else {
          // Need to request permissions to show notifications.
          return this.requestNotificationsPermissions();
        }
      }).catch((err) => {
        this.snackBar.open('Unable to get messaging token.', null, {
          duration: 5000
        });
        console.error(err);
      });
  };

  requestNotificationsPermissions() {
    console.log('Requesting notifications permission...');
    return firebase.messaging().requestPermission()
      // Notification permission granted.
      .then(() => this.saveMessagingDeviceToken())
      .catch((err) => {
        this.snackBar.open('Unable to get permission to notify.', null, {
          duration: 5000
        });
        console.error(err);
      });
  };

}
