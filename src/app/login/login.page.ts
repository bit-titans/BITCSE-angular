import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username:any;
  password:any;
  constructor(private authService:AuthService,private router:Router) { 
    console.log(this.authService.isLoggedIn())
    if(this.authService.isLoggedIn())
        this.router.navigateByUrl('/');
  }

  ngOnInit() {
  }
  signIn()
  {
      console.log(this.username+this.password)
     this.authService.login(this.username,this.password);
  }
  signup()
  {
    
  }
}
