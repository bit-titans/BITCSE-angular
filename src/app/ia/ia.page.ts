import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-ia',
  templateUrl: './ia.page.html',
  styleUrls: ['./ia.page.scss'],
})
export class IaPage implements OnInit {
  dark:Boolean;
  ias:any;
  constructor(private api:ApiService) { }

  ngOnInit() {
     if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
    // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise set to light.
    this.dark = window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false;
} else {
    // If the browser doesn't support prefers-color-scheme, set it as default to dark
   this.dark =true;
}
this.api.getMarks().subscribe(data=> {
  this.ias = data;
})
  }

}
