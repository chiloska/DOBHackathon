import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patient: any;
  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const Id = params.get('id');
      this.data.getPatient(Id).subscribe((res: any) => {
        this.patient = res;
        console.log(res)
      });
    });
  }

}
