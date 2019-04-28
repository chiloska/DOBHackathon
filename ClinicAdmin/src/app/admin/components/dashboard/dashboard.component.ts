import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Date = new Date();
  agendas: Observable<any[]>;

  constructor(private breakpointObserver: BreakpointObserver, private data: DataService) { }

  ngOnInit() {
    this.data.getAgenda().subscribe((res: any) => {
      this.agendas = res;
      console.log(res);
    });
  }
}
