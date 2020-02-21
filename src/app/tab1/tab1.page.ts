import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  currentDate:number;
  selDay:any;
  TT:any;
  LTT:any;
  today:any;
  Ltoday:any;
  labLength:number;
  segment="theory";
  labContext = false;
  ngOnInit(): void {
   let date = new Date();
   if(date.getDay()==0)
    this.currentDate = 1
  else
    this.currentDate = date.getDay()-1
  this.selDay = this.currentDate;
  this.api.getTT().subscribe(data=>{
    let offline = JSON.stringify(data);
    localStorage.setItem("TT",offline);
    this.TT=data;
    this.today = this.TT[this.currentDate];
  },error=>{if(error.status==504)
                this.goOffline()})
  this.api.getLab().subscribe(data=>{
    let offline = JSON.stringify(data);
    localStorage.setItem("LTT",offline);
    this.LTT=data;
    this.Ltoday = this.LTT[this.currentDate];
    this.labLength = this.Ltoday.length;
  },error=>{if(error.status==504)
                this.goOffline()})
  }
  
  days = [
    {index:0,
     value:"Monday"},
     {index:1,
      value:"Tuesday"},
      {index:2,
        value:"Wednesday"},
        {index:3,
          value:"Thursday"},
          {index:4,
            value:"Friday"},
            {index:5,
              value:"Saturday"}
  ]
  constructor(private api:ApiService,private router:Router,private authService:AuthService) {}

  change()
  {
    this.today = this.TT[this.selDay];
    this.Ltoday = this.LTT[this.selDay];
    this.labLength = this.Ltoday.length;
  }

  segmentChanged()
  {
    if(this.segment=="lab")
      this.labContext = true;
    else
      this.labContext = false
  }

  goOffline()
  {
    console.log("You are offline");
    this.TT=JSON.parse(localStorage.getItem("TT"));
    this.today = this.TT[this.currentDate];
    this.LTT=JSON.parse(localStorage.getItem("LTT"));
    this.Ltoday = this.LTT[this.currentDate];
    this.labLength = this.Ltoday.length;
  }
}


function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}