import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  facs:Faculty[];
  constructor(private authService:AuthService,private http:HttpClient) { }

  getFaculty()
  {

    let token = this.authService.getToken();
    token = "Bearer " + token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    return this.http.get<Faculty[]>('http://localhost:8000/api/getFaculty',httpOptions)
  }

  getTT()
  {
    let token = this.authService.getToken();
    token = "Bearer " + token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    return this.http.get('http://localhost:8000/api/getTT',httpOptions)
  }

  getLab()
  {
    let token = this.authService.getToken();
    token = "Bearer " + token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    return this.http.get('http://localhost:8000/api/getLAB',httpOptions)
  }
}


export interface Faculty
{
  fid: String
  name:String;
  email:String;
  phone:String;
  desg:String;
  qual:String;
}