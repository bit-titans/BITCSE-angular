import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private authService:AuthService, private api:ApiService) {}

  logout(){
    this.authService.logout()
  }

  about()
  {
    this.api.getFaculty().subscribe(data=>{console.log(data)})
  }
}
