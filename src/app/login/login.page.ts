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
  password="1999-02-19";
  constructor(private authService:AuthService,private router:Router) { 
    if(this.authService.isLoggedIn())
        this.router.navigateByUrl('/');
  }

  ngOnInit() {
  }
  signIn()
  {
     this.authService.login(this.username,this.password.toString().substring(0,10));
  }
  signUp()
  {
    
  }
}
