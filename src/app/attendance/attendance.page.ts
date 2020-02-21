import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  dark:Boolean;
  attends:any;  
  constructor(private api:ApiService) { }

  ngOnInit() {
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise set to light.
      this.dark = window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false;
  } else {
      // If the browser doesn't support prefers-color-scheme, set it as default to dark
     this.dark =true;
  }
  this.api.getAttendance().subscribe(data=> {
    localStorage.setItem("attendance",JSON.stringify(data));
    this.attends = data;
  },error=>{if(error.status==504)
                  this.goOffline()})
  
  }

  goOffline()
  {
    console.log("You are offline");
    this.attends = JSON.parse(localStorage.getItem("attendance"));
  }
}
