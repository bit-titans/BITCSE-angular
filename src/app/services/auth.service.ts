import { Injectable } from '@angular/core';
import * as moment from "moment";
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  access:String;
  constructor(private http: HttpClient,private router:Router) { }

  login(uname:string, password:string ) {
    const httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
        })
      };
      let formData:FormData = new FormData();
      formData.append('username',uname);
      formData.append('password',password);
     this.http.post<Token>("/api/token/",formData,httpOptions).subscribe(data=>{this.setSession(data.access);
      this.router.navigateByUrl('/')});
}
      
private setSession(authResult) {
    const expiresAt = moment().add('5','m');
    localStorage.setItem('id_token', authResult);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
}          

logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.router.navigateByUrl('/login');
}

public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
}

isLoggedOut() {
    return !this.isLoggedIn();
}

getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
}
getToken()
{
  if(this.isLoggedIn())
    return localStorage.getItem("id_token");
  else
    return "Token Expired"
}    
}

export interface Token
{
    refresh:String;
    access:String;
}