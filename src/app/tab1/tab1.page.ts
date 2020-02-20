import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

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
    this.TT=data;
    this.today = this.TT[this.currentDate];
  })
  this.api.getLab().subscribe(data=>{
    this.LTT=data;
    this.Ltoday = this.LTT[this.currentDate];
    this.labLength = this.Ltoday.length;
  })
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
  constructor(private api:ApiService) {}

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
}
