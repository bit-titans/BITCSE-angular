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
    return this.http.get<Faculty[]>('https://bit-cse.ml/api/getFaculty',httpOptions)
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
    return this.http.get('https://bit-cse.ml/api/getTT',httpOptions)
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
    return this.http.get('https://bit-cse.ml/api/getLAB',httpOptions)
  }

  getMarks()
  {
    let token = this.authService.getToken();
    token = "Bearer " + token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    return this.http.get('https://bit-cse.ml/api/getMarks',httpOptions)
  }

  getAttendance()
  {
    let token = this.authService.getToken();
    token = "Bearer " + token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    return this.http.get('https://bit-cse.ml/api/getAttendance',httpOptions)
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