import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  tiles: any[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];
  constructor(private _auth: AuthService, private router: Router) {
    this._auth.isLogginActive().subscribe(loggin => {
      console.log(loggin);
      if (loggin) { this.router.navigate(['/dashboard/agenda']); }
    });
  }

  ngOnInit() {

  }

  googleLogin() {
    this._auth.googleLogin()
      .then(success => {
        console.log(success);
        this.router.navigate(['/dashboard/agenda']);
      })
      .catch(err => {
        alert('Error to login');
      });
  }

}
