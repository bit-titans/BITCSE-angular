import { Injectable } from '@angular/core';
import * as moment from "moment";
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  access:String;
  constructor(private http: HttpClient,private router:Router,public alertController: AlertController,public loadingController: LoadingController) { }

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
     this.http.post<Token>("/api/token/",formData,httpOptions).subscribe(data=>{this.setSession(data.access)}
                                                                                          ,error=>{this.presentAlert(error.error.detail)});
}
      
private async setSession(authResult) {
    const expiresAt = moment().add('30','d');
    localStorage.setItem('id_token', authResult);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    this.presentLoading();
    await delay(3000);
    this.router.navigateByUrl('/');
}          

logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("TT");
    localStorage.removeItem("LTT");
    localStorage.removeItem("attendance");
    localStorage.removeItem("ia");
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

async presentAlert(message:string) {
  const alert = await this.alertController.create({
    header: 'Login Error',
    message: message,
    buttons: ['OK']
  });

  await alert.present();
}
async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'Please wait...',
    duration: 3000
  });
  await loading.present();
}
}

export interface Token
{
    refresh:String;
    access:String;
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

