import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patients: Observable<any>;
  date = new Date();
  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.data.getPatients()
      .subscribe((res: any) => {
        this.patients = res;
        console.log(this.patients);
      });
  }

  details(id) {
    this.router.navigate([`/dashboard/patient/${id}`]);
  }
}
